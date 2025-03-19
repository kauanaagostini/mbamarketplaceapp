import { useState } from 'react'
import { FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { VStack } from '@gluestack-ui/themed'

import { AppNavigatorRoutesProps } from '@routes/app.routes'

import { HomeHeader } from '@components/HomeHeader'
import { ProductCard } from '@components/ProductCard'
import { SearchProducts } from '@components/SearchProducts'

export function Home() {
  const [product, setProduct] = useState([
    {
      id: '123e4567-e89b-12d3-a456-426614174000',
      title: 'Carrinho de brinquedo',
      description: 'teste',
      priceInCents: 2460,
    },
    {
      id: '123e4567-e89b-12d3-a456-426614174',
      title: 'Carrinho de brinquedo',
      description: 'teste',
      priceInCents: 2460,
    },
    {
      id: '123e4567-e89b-12d3-a456-42661-426614174000',
      title: 'Carrinho de brinquedo',
      description: 'teste',
      priceInCents: 2460,
    },
    {
      id: '123e4567-426614174000-e89b-12d3-a456-42661',
      title: 'Carrinho de brinquedo',
      description: 'teste',
      priceInCents: 2460,
    },
    {
      id: '123e4567-e89b-12d3-426614174000-a456-42661',
      title: 'Carrinho de brinquedo',
      description: 'teste',
      priceInCents: 2460,
    },
    {
      id: '426614174000-123e4567-e89b-12d3-a456-42661',
      title: 'Carrinho de brinquedo',
      description: 'teste',
      priceInCents: 2460,
    },
    {
      id: '123e4567-e89b-12d3-a456-42661',
      title: 'Carrinho de brinquedo',
      description: 'teste',
      priceInCents: 2460,
    },
    {
      id: '123e4567-e89b-12d3-a456-42661-42661417',
      title: 'Carrinho de brinquedo',
      description: 'teste',
      priceInCents: 2460,
    },
    {
      id: '42661417-123e4567-e89b-12d3-a456-42661',
      title: 'Carrinho de brinquedo',
      description: 'teste',
      priceInCents: 2460,
    },
    {
      id: '123e4567-e89b-12d3-42661417-a456-42661',
      title: 'Carrinho de brinquedo',
      description: 'teste',
      priceInCents: 2460,
    },
  ])

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  const handleOpenProductDetails = () => {
    navigation.navigate('product')
  }

  return (
    <VStack flex={1}>
      <VStack gap="$6" bg="$white" pt="$16" pb="$6" px="$6" rounded={20}>
        <HomeHeader />
        <SearchProducts />
      </VStack>
      <VStack flex={1}>
        <FlatList
          data={product}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProductCard data={item} onPress={handleOpenProductDetails} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: 12,
            paddingBottom: 20,
            gap: 8,
          }}
          columnWrapperStyle={{
            flexWrap: 'wrap',
            gap: 8,
            justifyContent: 'center',
          }}
          numColumns={2}
        />
      </VStack>
    </VStack>
  )
}
