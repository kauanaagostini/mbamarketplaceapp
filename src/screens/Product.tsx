import { Box, Heading, HStack, Image, Text, VStack } from '@gluestack-ui/themed'
import { Platform, TouchableOpacity } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

import { gluestackUIConfig } from '../../config/gluestack-ui.config'

import ArrowLeftSvg from '@assets/icon/arrow-left.svg'
import ChartHistogramSvg from '@assets/icon/chart-histogram.svg'
import ImageTest from '@assets/image/1e6bb3c6-9f03-4651-93c7-18dfedc28364.png'
import { Button } from '@components/Button'
import { getProductDetails } from '@services/ProductService'
import { useEffect, useState } from 'react'
import { ProductDTO } from '@dtos/ProductDTO'

type RoutesParamsProps = {
  productId: string
}

export function Product() {
  const [product, setProduct] = useState<ProductDTO>()

  const navigation = useNavigation()
  const route = useRoute()

  const { tokens } = gluestackUIConfig
  const { productId } = route.params as RoutesParamsProps

  const handleGoBack = () => {
    navigation.goBack()
  }

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

  const fetchProductDetails = async () => {
    try {
      const { product } = await getProductDetails({ productId })
      setProduct(product)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchProductDetails()
  }, [productId])

  return (
    <VStack mt="$24" flex={1}>
      <VStack px="$6" pb={75}>
        <TouchableOpacity onPress={handleGoBack} activeOpacity={0.6}>
          <HStack gap="$2">
            <ArrowLeftSvg
              width={20}
              height={20}
              fill={tokens.colors.orangeBase}
            />
            <Text
              fontFamily="$action"
              fontWeight="$medium"
              fontSize="$sm"
              color="$orangeBase"
            >
              Voltar
            </Text>
          </HStack>
        </TouchableOpacity>
        <Image
          rounded={6}
          backgroundColor="$shape"
          resizeMode="cover"
          w="$full"
          h={197}
          alt="Imagem do produto"
          source={{
            uri: product?.attachments[0].url,
          }}
          mt="$4"
          mb="$7"
        />
        <VStack gap="$7">
          <HStack justifyContent="space-between">
            <Heading fontFamily="$title" fontWeight="$bold" fontSize="$xl">
              {product?.title}
            </Heading>
            <HStack alignItems="flex-end" gap="$1">
              <Text
                fontFamily="$label"
                fontWeight="$medium"
                fontSize="$xs"
                textTransform="uppercase"
                paddingBottom={Platform.OS === 'android' ? 1 : 4}
              >
                R$
              </Text>
              <Heading fontFamily="$title" fontWeight="$bold" fontSize="$xl">
                {product && handleProductPrice(product.priceInCents)}
              </Heading>
            </HStack>
          </HStack>
          <VStack>
            <Text
              fontFamily="$body"
              fontWeight="$regular"
              fontSize="$sm"
              mb="$4"
            >
              {product?.description}
            </Text>
          </VStack>
          <VStack>
            <Text fontFamily="$title" fontWeight="$bold" fontSize="$sm">
              Categoria
            </Text>
            <Text fontFamily="$body" fontWeight="$regular" fontSize="$xs">
              {product?.category?.title}
            </Text>
          </VStack>
          <HStack
            backgroundColor="$blueLight"
            py="$3"
            pl="$3"
            pr="$4"
            rounded={10}
            gap="$3"
          >
            <Box
              borderColor="$blueDark"
              backgroundColor="$blueDark"
              borderWidth={1}
              rounded={10}
              w={40}
              h={40}
              justifyContent="center"
              alignItems="center"
            >
              <ChartHistogramSvg
                fill={tokens.colors.blueLight}
                width={20}
                height={20}
              />
            </Box>
            <Text
              flexShrink={1}
              fontFamily="$body"
              fontWeight="$regular"
              fontSize="$xs"
            >
              24 pessoas visualizaram este produto nos últimos 7 dias
            </Text>
          </HStack>
        </VStack>
      </VStack>

      <VStack
        flex={1}
        justifyContent="flex-end"
        bg="$white"
        px="$6"
        pb="$8"
        pt="$6"
      >
        <HStack justifyContent="space-between" alignItems="center">
          <HStack alignItems="flex-end" gap="$1">
            <Text
              fontFamily="$label"
              fontWeight="$medium"
              fontSize="$xs"
              textTransform="uppercase"
              paddingBottom={Platform.OS === 'android' ? 1 : 4}
            >
              R$
            </Text>
            <Heading fontFamily="$title" fontWeight="$bold" fontSize="$xl">
              35,89
            </Heading>
          </HStack>
          <Button
            title="Entrar em contato"
            width={168}
            height={40}
            fontSize="$sm"
          />
        </HStack>
      </VStack>
    </VStack>
  )
}
