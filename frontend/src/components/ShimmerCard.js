import React from 'react'

const ShimmerCard = (count) => {
  return (
              <div className="shimmer-card">
                  {[...Array(count)].map((_, index) =>
                      <div key={index} className="shimmer1"></div>
                  )}
              </div>
  )
}

export default ShimmerCard