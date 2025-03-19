import {
  Icon,
  Pressable,
  Toast,
  ToastDescription,
  ToastTitle,
  VStack,
} from '@gluestack-ui/themed'

import CloseIconSvg from '@assets/icon/cancel.svg'

type Props = {
  id: string
  title: string
  description?: string
  action?: 'success' | 'error'
  onClose: () => void
}

export function ToastMessage({
  id,
  title,
  description,
  action = 'success',
  onClose,
}: Props) {
  return (
    <Toast
      nativeID={`toast-${id}`}
      action={action}
      bgColor={action === 'success' ? '$success' : '$danger'}
      mt="$10"
    >
      <VStack space="xs" w="$full">
        <Pressable alignSelf="flex-end" onPress={onClose}>
          <Icon as={CloseIconSvg} fill="$white" color="transparent" />
        </Pressable>
        <ToastTitle
          color="$white"
          fontFamily="$title"
          fontWeight="$bold"
          fontSize="$sm"
        >
          {title}
        </ToastTitle>
        {description && (
          <ToastDescription
            color="$white"
            fontFamily="$body"
            fontWeight="$regular"
            fontSize="$xs"
          >
            {description}
          </ToastDescription>
        )}
      </VStack>
    </Toast>
  )
}
