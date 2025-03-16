import { useState } from 'react'
import { Center, ScrollView, Text, VStack } from '@gluestack-ui/themed'

import { AuthHeader } from '@components/AuthHeader'
import { Input } from '@components/Input'
import { Button } from '@components/Button'

import Logo from '@assets/Logo.svg'
import EmailSvg from '@assets/icon/mail.svg'
import PasswordSvg from '@assets/icon/access.svg'
import EyeIconSvg from '@assets/icon/view.svg'
import EyeIconOffSvg from '@assets/icon/view-off.svg'
import { useNavigation } from '@react-navigation/native'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'

export function SignIn() {
  const [showPassword, setShowPassword] = useState(false)

  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  const handleNewAccount = () => {
    navigation.navigate('signUp')
  }

  const handleState = () => {
    setShowPassword((showState) => {
      return !showState
    })
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px="$10" pb="$16" bg="$white">
        <Center my="$24">
          <Logo />
          <AuthHeader
            title="Acesse sua conta"
            subtitle="Informe seu e-mail e senha para entrar"
          />
        </Center>
        <Center gap="$4">
          <Input
            placeholder="mail@exemplo.com.br"
            label="Email"
            leftIcon={EmailSvg}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input
            placeholder="Sua senha"
            label="Senha"
            leftIcon={PasswordSvg}
            rightIcon={showPassword ? EyeIconSvg : EyeIconOffSvg}
            secureTextEntry={!showPassword}
            showPassword={handleState}
          />
          <Button title="Acessar" icon />
        </Center>
        <VStack flex={1} justifyContent="flex-end" mt="$4">
          <Text fontFamily="$body" fontWeight="$regular" fontSize="$md" mb="$3">
            Ainda não tem uma conta?
          </Text>
          <Button
            title="Cadastrar"
            variant="outline"
            icon
            onPress={handleNewAccount}
          />
        </VStack>
      </VStack>
    </ScrollView>
  )
}
