import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Center, ScrollView, Text, VStack } from '@gluestack-ui/themed'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

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

const signInSchema = yup.object({
  email: yup.string().required('Informe o e-mail').email('E-mail inválido'),
  password: yup.string().required('Informe a senha'),
})

export function SignIn() {
  const [showPassword, setShowPassword] = useState(false)

  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema),
  })

  const handleNewAccount = () => {
    navigation.navigate('signUp')
  }

  const handlePasswordState = () => {
    setShowPassword((showState) => {
      return !showState
    })
  }

  const handleSignIn = (data: any) => {
    console.log(data)
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
        <Center gap="$5">
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="mail@exemplo.com.br"
                label="Email"
                leftIcon={EmailSvg}
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Sua senha"
                label="Senha"
                leftIcon={PasswordSvg}
                rightIcon={showPassword ? EyeIconSvg : EyeIconOffSvg}
                secureTextEntry={!showPassword}
                showPassword={handlePasswordState}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
                onSubmitEditing={handleSubmit(handleSignIn)}
                returnKeyType="send"
              />
            )}
          />
          <Button
            mt="$5"
            title="Acessar"
            icon
            onPress={handleSubmit(handleSignIn)}
          />
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
