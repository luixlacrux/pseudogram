import React from 'react'
import TextField from 'react-md/lib/TextFields'

const FormTextField = ({ input, meta: { touched, error }, ...others }) => (
  <TextField {...input} {...others} error={touched && !!error} errorText={error} />
)

export default FormTextField
