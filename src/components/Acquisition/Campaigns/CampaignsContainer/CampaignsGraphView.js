import React from 'react'
import history from '../../../../history'
import { Tree, treeUtil } from 'react-d3-tree'

const NodeLabel = ({ nodeData, campaigns }) => {
  const attributes = nodeData.attributes || { id: null, name: 'Root', segments: [] }
  
  const onClickViewCampaign = (e) => { 
    e.preventDefault()
    history.push(`/campaigns/${attributes.id}`)
  }
  const onClickCreateChild = (e) => {
    e.preventDefault()
    history.push(`/campaigns/new?parent_campaign_id=${attributes.id}`)
  }

  const segments = attributes.segments.map(e => e.segment_description)

  const showCollapsedCount = nodeData._collapsed && nodeData._children && !!nodeData._children.length
  return (
    <div key={`node-${attributes.id}`} className="bg-white p-1 pb-3 border" style={{ width: 200 }}>
      <div className="text-center">
        <a className="text-primary" onClick={onClickViewCampaign}>{attributes.name}</a>
      </div>
      {!!segments.length && <div className="mb-2 text-center small"> in: {segments.join(', ')} </div>}
      { showCollapsedCount && (<div className="mb-2 text-center small font-italic"> (Collapsed: {countChildren(attributes.id, campaigns)} more)</div>)}
      <div className="d-flex justify-content-center" style={{ marginBottom: -28 }}>
        <button
          className="btn btn-primary rounded-circle p-0 pb-1"
          style={{ height: 25, width: 25, fontSize: 18, lineHeight: '18px' }}
          onClick={onClickCreateChild}
        >+</button>
      </div>
    </div>
  )
}


const countChildren = (campaignId, campaigns) => {
  const children = campaigns.filter(c => c.parent_campaign_id === campaignId)
  if (!children.length) { return 0 }
  return children.reduce((acc, child) => acc + countChildren(child.campaign_id, campaigns), children.length)
} 

const CenteredTree = ({ containerStyle, ...props }) => {
  const [translate, setTranslate] = React.useState({ x: 0, y: 0 })
  const treeContainer = React.useRef(null)


  function centerTree() {
    if (treeContainer && treeContainer.current) {
      const dimensions = treeContainer.current.getBoundingClientRect()
      setTranslate({
        x: dimensions.width / 2,
        y: 50, 
      })
    }
  }

  React.useEffect(() => {
    centerTree()
    window.addEventListener('resize', centerTree)
  }, [treeContainer])

  return (
    <div id="treeWrapper" ref={treeContainer} style={containerStyle}>
      <Tree 
        {...props}
        translate={translate} 
      />
    </div>
  )
}

function treeData(campaigns, segments, parentId = null, state = []) {
  campaigns.forEach(campaign => {
    const isChild = campaign.parent_campaign_id === parentId

    if (isChild) {
      state.push({
        parent: parentId || 'Root',
        child: campaign.campaign_id,
        attributes: {
          id: campaign.campaign_id,
          name: campaign.campaign_name,
          segments: segments.filter(segment => segment.campaign_id === campaign.campaign_id),
        },
      })
      treeData(campaigns, segments, campaign.campaign_id, state)
    }
  })
  return state
}

const filterOrphans = (campaigns, orphansFilter) => {
  return campaigns.filter(campaign => {
    const hasChildren = !!campaigns.filter(c => c.parent_campaign_id === campaign.campaign_id).length
    const filter = (!!campaign.parent_campaign_id || hasChildren)

    if (orphansFilter === 'hide') {
      return filter
    }
    if (orphansFilter === 'only show') {
      return !filter
    }
    return true
  })
}

export default ({ campaigns, segments }) => {

  const [orphansFilter, setOrphansFilter] = React.useState('hide')
  const filterValues = ['include', 'hide', 'only show']

  const filter = (<div className="btn-group btn-group-toggle" data-toggle="buttons">
    {filterValues.map(filterValue => (
      <label key={`filter-select-${filterValue}`} className={`mb-0 ${orphansFilter === filterValue ? 'active' : ''}`}>
        <input autoComplete="off" checked={orphansFilter === filterValue} className= "ml-2 mr-1 align-middle" id="option1" name="options" type="radio" onChange={() => setOrphansFilter(filterValue)} />
        <span>{filterValue}</span>
      </label>
    ))}
  </div>)

  const filteredCampaigns = filterOrphans(campaigns, orphansFilter)

  const nodes = treeData(filteredCampaigns, segments)
  
  return (
    <div>
      <div className="d-flex"><div>Orphans: </div>{filter}</div>
      { !nodes.length && <div className="mt-2 mb-4">No campaigns found. Try adjusting your filters </div> }
      { !!nodes.length && <CenteredTree
        allowForeignObjects={true}
        containerStyle={{ width: '100%', height: 500 }}
        data={treeUtil.generateHierarchy(nodes)}
        nodeLabelComponent={{
          render: <NodeLabel campaigns={filteredCampaigns} className="myLabelComponentInSvg" />,
          foreignObjectWrapper: {
            width: 200,
            y: -24,
            x: -100,
          },
        }}
        nodeSize={{ x: 300, y: 300 }}
        orientation="vertical"
        separation={{
          nonSiblings: 2,
          siblings: 1,
        }}
        zoom={0.6}
      /> }
    </div>
  )
}


