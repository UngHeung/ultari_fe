import { MouseEvent, MouseEventHandler } from 'react'

export interface BaseButtonOptions {
  id?: string
  type: 'submit' | 'button'
  value: string
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
}

/**
 * @param id?
 * @param type
 * @param value
 * @param onClick
 */
const BaseButton = (props: BaseButtonOptions) => {
  return (
    <button id={props.id} type={props.type} onClick={props.onClick}>
      {props.value}
    </button>
  )
}

export default BaseButton
