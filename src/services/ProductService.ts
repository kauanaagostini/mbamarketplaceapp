import { ProductDTO } from '@dtos/ProductDTO'
import { api } from './api'

export type GetAllAvailableProductsQuery = {
  search?: string | null
  status?: string | null
}

export type GetAllAvailableProductsResult = {
  products: ProductDTO[]
}

export type GetProductDetailsParam = {
  productId: string
}

export type GetProductDetailsResult = {
  product: ProductDTO
}

export const getAllAvailableProducts = async ({
  search,
  status,
}: GetAllAvailableProductsQuery) => {
  const response = await api.get<GetAllAvailableProductsResult>('/products', {
    params: {
      search,
      status,
    },
  })

  return response.data
}

export const getProductDetails = async ({
  productId,
}: GetProductDetailsParam) => {
  const response = await api.get<GetProductDetailsResult>(
    `/products/${productId}`
  )
  return response.data
}
