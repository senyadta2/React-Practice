import React, { memo } from 'react'

const Child = () => {
    console.log("child is rerendering...")
  return (
    <div>
      <h1>Child component</h1>
    </div>
  )
}

export default memo(Child)
