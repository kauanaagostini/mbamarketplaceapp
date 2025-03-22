import { ComponentProps } from 'react'
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  Input as GluestackInput,
  InputField,
  InputIcon,
  InputSlot,
  Text,
} from '@gluestack-ui/themed'

import AlertCircleSVG from '@assets/icon/alert-circle.svg'
import { gluestackUIConfig } from '../../config/gluestack-ui.config'

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
  errorMessage = null,
  isInvalid = false,
  isReadyOnly = false,
  label,
  rightIcon,
  leftIcon,
  width = '$full',
  showPassword,
  ...rest
}: Props) {
  const invalid = !!errorMessage || isInvalid
  const { tokens } = gluestackUIConfig

  return (
    <FormControl isInvalid={invalid} width={width}>
      <Text
        fontFamily="$label"
        fontWeight="$medium"
        fontSize="$xs"
        textTransform="uppercase"
      >
        {label}
      </Text>
      <GluestackInput
        isInvalid={isInvalid}
        borderTopWidth="$0"
        borderLeftWidth="$0"
        borderRightWidth="$0"
        rounded={0}
        gap="4"
        borderColor="$gray200"
        $focus={{
          borderColor: invalid ? '$danger' : '$gray400',
        }}
        $invalid={{
          borderColor: '$danger',
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
      <FormControlError>
        <AlertCircleSVG width={16} height={16} fill={tokens.colors.danger} />
        <FormControlErrorText
          color="$danger"
          fontFamily="$body"
          fontWeight="$regular"
          fontSize="$xs"
        >
          {errorMessage}
        </FormControlErrorText>
      </FormControlError>
    </FormControl>
  )
}
