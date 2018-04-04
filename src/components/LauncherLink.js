import React from 'react'
import { Link } from 'react-router';

const LauncherLink= props => {
  return (
    <div className = 'launcher'>
      <Link to = {`/launcher/${props.id}`}><h1>{props.name}</h1></Link>

    </div>
  )
}


export default LauncherLink
