import { createContext, ReactNode } from 'react'
import { UserDTO } from '@dtos/UserDTO'

export type AuthContextDataProps = {
  user: UserDTO
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  return (
    <AuthContext.Provider
      value={{
        user: {
          id: '1',
          name: 'Kauana',
          phone: '11 987654-3214',
          email: 'kauana@email.com',
          avatar: {
            id: '1',
            url: 'kauanaa.png',
          },
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
