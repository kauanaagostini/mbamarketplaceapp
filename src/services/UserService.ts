import { UserDTO } from '@dtos/UserDTO'
import { api } from './api'

export type GetUserTokenRequest = {
  email: string
  password: string
}

export type GetUserTokenResult = {
  accessToken: string
}

export type GetUserProfileResult = {
  seller: UserDTO
}

export type CreateUserProfileRequest = {
  name: string
  phone: string
  email: string
  avatarId: string | null
  password: string
  passwordConfirmation: string
}

export const getUserToken = async ({
  email,
  password,
}: GetUserTokenRequest) => {
  const result = await api.post<GetUserTokenResult>('/sellers/sessions', {
    email,
    password,
  })
  return result.data
}

export const getUserProfile = async () => {
  const result = await api.get<GetUserProfileResult>('/sellers/me')
  return result.data
}

export const createUserProfile = async ({
  name,
  phone,
  email,
  avatarId,
  password,
  passwordConfirmation,
}: CreateUserProfileRequest) => {
  const result = await api.post<GetUserProfileResult>('/sellers', {
    name,
    phone,
    email,
    avatarId,
    password,
    passwordConfirmation,
  })
  return result.data
}

export const updateUserProfile = async () => {}

export const userSignOut = async () => {
  const result = await api.post('/sign-out')
  return result
}
