import { ComponentProps } from 'react'
import {
  Input as GluestackInput,
  InputField,
  InputIcon,
  InputSlot,
  Text,
  VStack,
} from '@gluestack-ui/themed'

type Props = ComponentProps<typeof InputField> & {
  errorMessage?: string | null
  isInvalid?: boolean
  isReadyOnly?: boolean
  label?: string
  rightIcon?: React.FC
  leftIcon?: React.FC
  width?: number | string
  showPassword?: () => void
}

export function Input({
  isReadyOnly = false,
  label,
  rightIcon,
  leftIcon,
  width = '$full',
  showPassword,
  ...rest
}: Props) {
  return (
    <VStack width={width}>
      <Text
        fontFamily="$label"
        fontWeight="$medium"
        fontSize="$xs"
        textTransform="uppercase"
      >
        {label}
      </Text>
      <GluestackInput
        variant="underlined"
        gap="4"
        borderColor="$gray200"
        $focus={{
          borderColor: '$gray400',
        }}
        isReadOnly={isReadyOnly}
        opacity={isReadyOnly ? 0.5 : 1}
      >
        {leftIcon && (
          <InputSlot>
            <InputIcon as={leftIcon} color="$danger" />
          </InputSlot>
        )}
        <InputField
          fontFamily="$body"
          fontWeight="$regular"
          fontSize="$md"
          color="$gray400"
          placeholderTextColor="$gray200"
          {...rest}
        />
        {rightIcon && (
          <InputSlot onPress={showPassword}>
            <InputIcon as={rightIcon} />
          </InputSlot>
        )}
      </GluestackInput>
    </VStack>
  )
}
