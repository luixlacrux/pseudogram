import React from 'react'
import FileInput from 'react-md/lib/FileInputs'

export default function ({ onUpload }) {
  const handleFileSelect = (file) => {
    onUpload(file)
  }

  return (
    <FileInput
      id="imageInput"
      onChange={handleFileSelect}
      accept="image/*"
      secondary
      iconBefore
      label="Subir una Foto"
    />
  )
}
