import React from 'react'

function FileUpload ({ uploadValue, onUpload }) {
  return (
    <div>
      <progress value={uploadValue} max="100">
        {uploadValue}
      </progress>
      <br/>
      <input type="file" onChange={onUpload}/>
    </div>
  )
}

export default FileUpload
