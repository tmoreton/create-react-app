import React from 'react'

const SaveHeader = ({ name, saved, saving, onSave, valid, unsavedChanges, writeAccess }) => {
  return (
    <div className="d-flex justify-content-between align-items-center">
      <h1 className="my-3">{name}</h1>
      <div className="d-flex flex-column align-items-end">
        {writeAccess && (
          <div>
            <div>
              {saved && (
                <span className="mr-3 text-success">Success!</span>
              )}
              {saving && (
                <span className="mr-3">Saving...</span>
              )}
              <button className="btn btn-primary text-right" disabled={!valid || !unsavedChanges} onClick={onSave}>Save</button>
            </div>
            <div className="text-muted text-right">
              {unsavedChanges && (
                <small><i>Unsaved Changes</i></small>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SaveHeader

SaveHeader.defaultProps = {
  name: 'New',
}
