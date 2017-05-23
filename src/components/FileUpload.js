import React from 'react'
import ProgressBar from './ProgressBar'
import FileInput from './FileInput'
import '../styles/fileUpload.css'

function FileUpload ({ uploadValue, onUpload }) {
  return (
    <div className="FileUpload">
      <ProgressBar uploadValue={uploadValue} />
      <FileInput onUpload={onUpload} />
    </div>
  )
}

export default FileUpload
