import React from 'react'
import jar from '../../assets/img/comb.png'


const TacoIcon = ({ size = 36, v1, v2, v3 }) => (
  <span
    role="img"
    style={{
      fontSize: size,
      filter: v1 ? 'saturate(0.5)' : undefined,
    }}
  >
    <img src={jar} height="25" alt="Taco" />
  </span>
)

export default TacoIcon
