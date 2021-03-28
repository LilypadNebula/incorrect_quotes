import React from 'react'

interface Props {
  name: string
  update: Function
  disabled?: boolean
}

const NameBlock = ({ name, update, disabled = false }: Props) => {
  const classes = `rounded my-2 ${disabled ? 'bg-gray-200 cursor-not-allowed' : ''}`
  return <input disabled={disabled} className={classes} type="text" defaultValue={name} onChange={({ target }) => { update(target.value) }} />
}

export default NameBlock