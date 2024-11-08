import React from 'react'

function Heading({ title, subtitle }) {
  return (<>
    {!subtitle && <h1 className="mb-8">{title}</h1>}
    {subtitle && (<>
      <h1 className="mb-1">{title}</h1>
      <div className="mb-8">{subtitle}</div>
    </>)}
  </>

  )
}

export default Heading