import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import {
  Box,
  Center,
  Heading,
  ScrollView,
  Text,
  VStack,
} from '@gluestack-ui/themed'

import { AuthHeader } from '@components/AuthHeader'
import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { UserPhoto } from '@components/UserPhoto'

import Logo from '@assets/Logo.svg'
import defaultUserPhotoImg from '@assets/image-upload-full.png'
import UserSvg from '@assets/icon/user.svg'
import PhoneSvg from '@assets/icon/call.svg'
import EmailSvg from '@assets/icon/mail.svg'
import PasswordSvg from '@assets/icon/access.svg'
import EyeIconSvg from '@assets/icon/view.svg'
import EyeIconOffSvg from '@assets/icon/view-off.svg'

export function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const navigation = useNavigation()

  const handleGoBack = () => {
    navigation.goBack()
  }

  const handlePasswordState = () => {
    setShowPassword((showState) => {
      return !showState
    })
  }

  const handleConfirmPasswordState = () => {
    setShowConfirmPassword((showState) => {
      return !showState
    })
  }
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px="$10" pb="$16" bg="$white">
        <Center mt="$24" mb="$12">
          <Logo />
          <AuthHeader
            title="Crie sua conta"
            subtitle="Informe os seus dados pessoais e de acesso"
          />
        </Center>
        <Center gap="$4">
          <UserPhoto
            source={defaultUserPhotoImg}
            alt="Imagem do usuário"
            w={120}
            h={120}
          />
          <Input
            placeholder="Seu nome completo"
            label="Nome"
            leftIcon={UserSvg}
          />
          <Input
            placeholder="(00) 00000-0000"
            label="Telefone"
            leftIcon={PhoneSvg}
          />

          <Heading fontFamily="$title" fontWeight="$bold" fontSize="$md">
            Acesso
          </Heading>
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
            showPassword={handlePasswordState}
          />
          <Input
            placeholder="Confirme a senha"
            label="Confirmar senha"
            leftIcon={PasswordSvg}
            rightIcon={showConfirmPassword ? EyeIconSvg : EyeIconOffSvg}
            secureTextEntry={!showConfirmPassword}
            showPassword={handleConfirmPasswordState}
          />
          <Button title="Cadastrar" icon />
        </Center>
        <VStack flex={1} justifyContent="flex-end" mt="$16">
          <Text fontFamily="$body" fontWeight="$regular" fontSize="$md" mb="$3">
            Já tem uma conta?
          </Text>
          <Button
            title="Acessar"
            variant="outline"
            icon
            onPress={handleGoBack}
          />
        </VStack>
      </VStack>
    </ScrollView>
  )
}
