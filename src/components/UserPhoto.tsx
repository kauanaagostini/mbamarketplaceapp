import { ComponentProps } from 'react'

import { Image } from '@gluestack-ui/themed'

type Props = ComponentProps<typeof Image>

export function UserPhoto({ ...rest }: Props) {
  return <Image rounded={12} backgroundColor="$shape" {...rest} />
}
