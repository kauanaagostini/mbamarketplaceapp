import { ComponentProps } from 'react'

import {
  Button as GluestackButton,
  ButtonSpinner,
  Text,
  Icon,
} from '@gluestack-ui/themed'

import ArrowIconOrange from '@assets/icon/arrow-right-orange.svg'
import ArrowIconWhite from '@assets/icon/arrow-right-white.svg'

type Props = ComponentProps<typeof GluestackButton> & {
  title: string
  variant?: 'solid' | 'outline'
  height?: number
  isLoading?: boolean
  icon?: boolean
}

export function Button({
  title,
  height = 56,
  variant = 'solid',
  isLoading = false,
  ...rest
}: Props) {
  return (
    <GluestackButton
      w="$full"
      h={height}
      bg={variant === 'outline' ? 'transparent' : '$orangeBase'}
      borderWidth={variant === 'outline' ? '$1' : '$0'}
      borderColor="$orangeBase"
      rounded={10}
      $active-bg={variant === 'outline' ? '$shape' : '$orangeDark'}
      disabled={isLoading}
      justifyContent={isLoading ? 'center' : 'space-between'}
      {...rest}
    >
      {isLoading ? (
        <ButtonSpinner
          color={variant === 'outline' ? '$orangeBase' : 'white'}
        />
      ) : (
        <>
          <Text
            color={variant === 'outline' ? '$orangeBase' : 'white'}
            fontFamily="$action"
            fontWeight="$medium"
            fontSize="$md"
          >
            {title}
          </Text>
          <Icon
            as={variant === 'outline' ? ArrowIconOrange : ArrowIconWhite}
            color="transparent"
          />
        </>
      )}
    </GluestackButton>
  )
}
