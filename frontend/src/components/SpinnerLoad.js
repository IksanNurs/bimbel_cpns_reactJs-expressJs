import React from 'react'
import { Spinner } from 'react-bootstrap'

const SpinnerLoad = () => {
  return (
      <div className="d-flex align-items-center">
      <Spinner animation="border" variant="warning" style={{ width: '50px', height: '50px', borderWidth: '3px', }} />
          <span className="text-dark mx-3">Loading...</span>
      </div>
  )
}

export default SpinnerLoad