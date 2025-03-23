import { useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { VStack } from '@gluestack-ui/themed'

import { AppNavigatorRoutesProps } from '@routes/app.routes'

import { HomeHeader } from '@components/HomeHeader'
import { ProductCard } from '@components/ProductCard'
import { SearchProducts } from '@components/SearchProducts'
import { getAllAvailableProducts } from '@services/ProductService'
import { ProductDTO } from '@dtos/ProductDTO'

export function Home() {
  const [products, setProducts] = useState<ProductDTO[]>([])

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  const handleOpenProductDetails = (productId: string) => {
    navigation.navigate('product', { productId })
  }

  const fetchAllAvailableProducts = async () => {
    try {
      const status = 'available'
      const search = null
      const { products } = await getAllAvailableProducts({ search, status })
      setProducts(products)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchAllAvailableProducts()
  }, [])

  return (
    <VStack flex={1}>
      <VStack gap="$6" bg="$white" pt="$16" pb="$6" px="$6" rounded={20}>
        <HomeHeader />
        <SearchProducts />
      </VStack>
      <VStack flex={1}>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProductCard
              data={item}
              onPress={() => handleOpenProductDetails(item.id)}
            />
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
