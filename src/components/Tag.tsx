import { Link } from 'gatsby'
import React from 'react'

type Props = {
  name?: string
  color?: string
}

const TAG: React.FC<Props> = ({ name, color }) => (
  <div style={{
    backgroundColor: color,
  }}
  >
    {name}
  </div>
)

export default TAG
