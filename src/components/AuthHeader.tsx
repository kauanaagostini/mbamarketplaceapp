import { ComponentProps } from 'react'
import { Heading, Text } from '@gluestack-ui/themed'

type Props = ComponentProps<typeof Text> & {
  title: string
  subtitle: string
}

export function AuthHeader({ title, subtitle }: Props) {
  return (
    <>
      <Text
        mt="$10"
        mb="$1"
        fontFamily="$title"
        fontWeight="$bold"
        fontSize="$2xl"
        color="$gray500"
      >
        {title}
      </Text>
      <Text
        fontFamily="$body"
        fontWeight="$regular"
        fontSize="$sm"
        color="$gray300"
      >
        {subtitle}
      </Text>
    </>
  )
}
