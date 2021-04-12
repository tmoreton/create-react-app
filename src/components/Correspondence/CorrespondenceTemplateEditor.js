/* global Blob: false */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Quill from 'quill'
import isEmpty from 'lodash/isEmpty'
import range from 'lodash/range'
import quillBetterTable from 'quill-better-table'
import axios from 'axios'
import updateCorrespondenceTemplate from '../../actions/correspondence/updateCorrespondenceTemplate'
import cancelCorrespondenceTemplatePendingChanges from '../../actions/correspondence/cancelCorrespondenceTemplatePendingChanges'

// Change default container to div to better format data
const defaultContentContainerElement = Quill.import('blots/block')
defaultContentContainerElement.tagName = 'DIV'
Quill.register(defaultContentContainerElement, true)

// Setup limited font sizes
const fontSizeStyle = Quill.import('attributors/style/size')
const minFontSize = 8
const maxFontSize = 32
const fontStep = 1
const fontUnit = 'pt'
fontSizeStyle.whitelist = range(minFontSize, maxFontSize + fontStep, fontStep).map(size => size + fontUnit)
fontSizeStyle.whitelist.unshift('') // Include blank default
Quill.register(fontSizeStyle, true)

// Setup table plugin
Quill.register({ 'modules/better-table': quillBetterTable }, true)

class CorrespondenceTemplateEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quillInstance: Quill.find(document.querySelector('#editor')),
    }
  }

  componentDidMount() {
    if (this.state.quillInstance) return

    // Store list of possible mappings
    const variableMapping = {}
    const liquidVariables = this.props.correspondenceTemplate.variable_mappings.map(vm => {
      variableMapping[vm.liquid_variable] = vm.description
      return vm.liquid_variable
    })

    const modules = {
      toolbar: {
        container: [
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ 'list': 'bullet' }],
          [{ 'script': 'sub' }, { 'script': 'super' }],
          [{ 'indent': '-1' }, { 'indent': '+1' }],
          [{ 'align': ['', 'center', 'right'] }],
          ['link', 'image'],
          [{ 'color': [] }, { 'background': [] }], // use default color options
          [{ 'size': fontSizeStyle.whitelist }],
          [{ 'variables': liquidVariables }],
          ['table'],
          ['clean'],
        ],
        handlers: {
          'table'() {
            this.quill.getModule('better-table').insertTable(2,2)
          },
          'variables'(value) {
            if (value) {
              let formattedValue

              if (value.charAt(value.length - 1) === '?') {
                formattedValue = '{% if ' + value + ' %}'
              } else {
                formattedValue = '{{ ' + value + ' }}'
              }

              const cursorPosition = this.quill.getSelection().index
              this.quill.insertText(cursorPosition, formattedValue)
              this.quill.setSelection(cursorPosition + formattedValue.length)
            }
          },
          'image'() {
            const value = this.quill.getSelection()
            const url = window.prompt('Paste the url of the image here')
            const selectionRange = this.quill.getSelection(true)
            if (value) {
              this.quill.insertEmbed(selectionRange.index, 'image', url, Quill.sources.USER)
            }
          },
        },
      },
      table: false,
      'better-table': {
        operationMenu: {
          color: {
            colors: ['green', 'red', 'yellow', 'blue', 'white'],
            text: 'Background Colors:',
          },
        },
      },
      keyboard: {
        bindings: quillBetterTable.keyboardBindings,
      },
    }

    const quillInstance = new Quill('#editor', { modules, theme: 'snow' })

    // Only "dangerous" because of XSS which should not be a concern for this secured internal tool
    // https://quilljs.com/docs/modules/clipboard/#dangerouslypastehtml
    quillInstance.clipboard.dangerouslyPasteHTML(this.htmlForVersion())
    // Disable to start for published version
    quillInstance.disable()

    // Sets up liquid variable toolbar dropdown
    document.querySelectorAll('.ql-variables .ql-picker-item').forEach(function(item) {
      item.textContent = variableMapping[item.dataset.value]
    })
    document.querySelector('.ql-variables .ql-picker-label').innerHTML = 'Insert Variables'

    // Fix to stop the page from scrolling up when variables are inserted
    document.querySelector('.ql-toolbar').addEventListener('mousedown', function(e) {
      e.preventDefault()
      e.stopPropagation()
    })

    this.setState({ quillInstance })
  }

  componentDidUpdate = (prevProps) => {
    const quillInstance = this.state.quillInstance
    if (this.props.error) {
      // If template failed to save, need to reallow editing
      quillInstance.enable()
    } else if (prevProps.correspondenceTemplate.updated_at !== this.props.correspondenceTemplate.updated_at || prevProps.version !== this.props.version) {
      // If template succesfully updated or If viewing version changed need to update quill content
      quillInstance.setContents([])
      quillInstance.clipboard.dangerouslyPasteHTML(this.htmlForVersion())
      if (this.isViewingPending()) {
        quillInstance.enable()
      } else {
        quillInstance.disable()
      }
    }
  }

  isViewingPending() {
    return this.props.version === 'PENDING'
  }

  hasPendingChanges() {
    return !!this.props.correspondenceTemplate.pending_liquid_html
  }

  htmlForVersion = () => {
    if (this.isViewingPending() && this.hasPendingChanges()) {
      return this.props.correspondenceTemplate.pending_liquid_html
    } else {
      return this.props.correspondenceTemplate.liquid_html
    }
  }

  savePendingChanges = () => {
    this.updateCorrespondenceTemplate(false)
  }

  publishPendingChanges = () => {
    this.updateCorrespondenceTemplate(true)
  }

  cancelPendingChanges = () => {
    this.props.cancelCorrespondenceTemplatePendingChanges(this.props.correspondenceTemplate.correspondence_template_id)
  }

  updateCorrespondenceTemplate = (publish) => {
    const quillInstance = this.state.quillInstance
    quillInstance.disable()
    this.props.updateCorrespondenceTemplate({ correspondenceTemplateId: this.props.correspondenceTemplate.correspondence_template_id, html: quillInstance.root.innerHTML, publish })
  }

  download = () => {
    axios.get(`${process.env.REACT_APP_GARCON_API}/correspondence/correspondence_templates/${this.props.correspondenceTemplate.correspondence_template_id}/download`, { responseType: 'arraybuffer' }).then(response => {
      const file = new Blob([response.data], { type: 'application/octet-stream' })
      const fileURL = URL.createObjectURL(file)
      const a = document.createElement('a')
      a.href = fileURL
      a.download = `${this.props.correspondenceTemplate.description}${(new Date()).toLocaleDateString('en-US')}.docx`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    })
  }

  render() {
    if (isEmpty(this.props.correspondenceTemplate)) {
      return <div>Loading...</div>
    }

    return (<div className="mt-3 mb-2">
        &nbsp;
      <button className="btn btn-sm btn-primary mr-4" style={{ display: this.isViewingPending() ? 'inline-block' : 'none' }} onClick={this.savePendingChanges}>Save Pending Changes</button>
      <button className="btn btn-sm btn-danger mr-4" style={{ display: this.hasPendingChanges() ? 'inline-block' : 'none' }} onClick={this.cancelPendingChanges}>Cancel Pending Changes</button>
      <button className="btn btn-sm btn-warning mr-4" style={{ display: !this.isViewingPending() || !this.hasPendingChanges() ? 'none' : 'inline-block' }} onClick={this.publishPendingChanges}>Publish Pending Changes</button>
      <button className="btn btn-link float-right" style={{ display: this.isViewingPending() ? 'none' : 'block' }} onClick={this.download}>Download Template (.docx)</button>
      <div>{this.props.saving ? 'Saving...' : null}</div>
    </div>)
  }
}

function mapStateToProps({ correspondenceTemplates, error }) {
  return {
    correspondenceTemplate: correspondenceTemplates.currentCorrespondenceTemplate,
    saving: correspondenceTemplates.saving,
    error: error.show,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateCorrespondenceTemplate, cancelCorrespondenceTemplatePendingChanges }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CorrespondenceTemplateEditor)
