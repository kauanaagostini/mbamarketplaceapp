import { ProductDTO } from '@dtos/ProductDTO'
import { Box, HStack, Image, Text, VStack } from '@gluestack-ui/themed'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'

import ImageTest from '@assets/image/1e6bb3c6-9f03-4651-93c7-18dfedc28364.png'

type Props = TouchableOpacityProps & {
  data: ProductDTO
}

export function ProductCard({ data, ...rest }: Props) {
  const handleProductPrice = (productPriceInCents: number) => {
    const productPrice = productPriceInCents / 100
    const editValue = productPrice
      .toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      })
      .replace('R$', '')

    return editValue
  }
  return (
    <TouchableOpacity {...rest}>
      <Box w={167} bg="$white" rounded={10} p="$1">
        <Image
          rounded={6}
          backgroundColor="$shape"
          resizeMode="cover"
          w={167}
          alt="Imagem do produto"
          source={ImageTest}
        />
        <VStack p="$1" gap={2}>
          <Text
            fontFamily="$body"
            fontWeight="$regular"
            fontSize="$xs"
            color="$gray400"
          >
            {data.title}
          </Text>
          <HStack alignItems="flex-end">
            <Text
              fontFamily="$label"
              fontWeight="$medium"
              fontSize="$2xs"
              textTransform="uppercase"
              color="$gray500"
            >
              R$
            </Text>
            <Text
              fontFamily="$title"
              fontWeight="$bold"
              fontSize="$sm"
              color="$gray500"
            >
              {handleProductPrice(data.priceInCents)}
            </Text>
          </HStack>
        </VStack>
      </Box>
    </TouchableOpacity>
  )
}
