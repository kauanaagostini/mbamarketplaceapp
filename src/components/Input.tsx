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
  showPassword?: () => void
}

export function Input({
  rightIcon,
  leftIcon,
  label,
  showPassword,
  ...rest
}: Props) {
  return (
    <VStack width="$full">
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
