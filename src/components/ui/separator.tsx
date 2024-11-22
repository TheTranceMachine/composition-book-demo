'use client'

import { forwardRef } from 'react'

import * as SeparatorPrimitive from '@radix-ui/react-separator'

const Separator = forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>((props, forwardedRef) => <SeparatorPrimitive.Root {...props} ref={forwardedRef} />)

Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }