import React from 'react'
import { Spinner } from 'react-bootstrap'

const SpinnerXS = () => {
  return (
    <span style={{minWidth:'18px', minHeight:'18px'}}
    className="spinner-border spinner-border-sm text-warning align-self-start"
    role="status"
    aria-hidden="true"
></span>
  )
}

export default SpinnerXS