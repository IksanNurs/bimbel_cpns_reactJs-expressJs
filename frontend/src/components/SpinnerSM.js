import React from 'react'
import { Spinner } from 'react-bootstrap'

const SpinnerSM = () => {
  return (
    <span style={{minWidth:'22.8px', minHeight:'22.8px'}}
    className="spinner-border spinner-border-sm text-warning align-self-start"
    role="status"
    aria-hidden="true"
></span>
  )
}

export default SpinnerSM