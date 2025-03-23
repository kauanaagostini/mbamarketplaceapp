import { createContext, ReactNode, useEffect, useState } from 'react'

import { UserDTO } from '@dtos/UserDTO'

import { api } from '@services/api'
import {
  getUserProfile,
  getUserToken,
  userSignOut,
} from '@services/UserService'

import {
  storageAuthTokenGet,
  storageAuthTokenRemove,
  storageAuthTokenSave,
} from '@storage/storageAuthToken'
import {
  storageUserGet,
  storageUserRemove,
  storageUserSave,
} from '@storage/storageUser'

export type AuthContextDataProps = {
  user: UserDTO
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)
  const [isLoadingStorageData, setIsLoadingStorageData] = useState(false)

  const tokenUpdate = (token: string) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  const userAndTokenUpdate = (userData: UserDTO, token: string) => {
    tokenUpdate
    setUser(userData)
  }

  const storageToken = async (token: string) => {
    try {
      setIsLoadingStorageData(true)
      await storageAuthTokenSave(token)
    } catch (error) {
      throw error
    } finally {
      setIsLoadingStorageData(false)
    }
  }

  const storageUser = async (userData: UserDTO) => {
    try {
      setIsLoadingStorageData(true)
      await storageUserSave(userData)
    } catch (error) {
      throw error
    } finally {
      setIsLoadingStorageData(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { accessToken } = await getUserToken({ email, password })
      if (accessToken) {
        await storageToken(accessToken)
        tokenUpdate(accessToken)
        const { seller } = await getUserProfile()
        await storageUser(seller)
        userAndTokenUpdate(seller, accessToken)
      }
    } catch (error) {
      throw error
    }
  }

  const signOut = async () => {
    try {
      setIsLoadingStorageData(true)
      setUser({} as UserDTO)
      const { status } = await userSignOut()
      if (status === 204) {
        await storageUserRemove()
        await storageAuthTokenRemove()
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingStorageData(false)
    }
  }

  const loadUserData = async () => {
    try {
      setIsLoadingStorageData(true)
      const userLogged = await storageUserGet()
      const token = await storageAuthTokenGet()

      if (token && userLogged) {
        userAndTokenUpdate(userLogged, token)
      }
    } catch (error) {}
  }

  useEffect(() => {
    loadUserData()
  }, [])

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
