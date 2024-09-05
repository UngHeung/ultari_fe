import BaseButton, {
  BaseButtonOptions,
} from '@/app/common/components/BaseButton'
import React from 'react'

export interface AuthButtonOptions extends BaseButtonOptions {}

const AuthButton = (props: AuthButtonOptions) => {
  return (
    <BaseButton
      id={props.id}
      type={props.type}
      value={props.value}
      onClick={props.onClick}
    />
  )
}

export default AuthButton
