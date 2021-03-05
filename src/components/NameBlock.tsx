import React from 'react'

interface Props {
  name: string
  update: Function
}

const NameBlock = ({name, update}: Props) => {
  return <input className="rounded" type="text" defaultValue={name} onChange={({target}) => {update(target.value)}}/>
}

export default NameBlock