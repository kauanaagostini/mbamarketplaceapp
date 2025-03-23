import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'
import {
  Center,
  Heading,
  ScrollView,
  Text,
  useToast,
  VStack,
} from '@gluestack-ui/themed'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { api } from '@services/api'
import { AppError } from '@utils/AppError'

import { AuthHeader } from '@components/AuthHeader'
import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { UserPhoto } from '@components/UserPhoto'
import { ToastMessage } from '@components/ToastMessage'

import Logo from '@assets/Logo.svg'
import defaultUserPhotoImg from '@assets/image-upload-full.png'
import UserSvg from '@assets/icon/user.svg'
import PhoneSvg from '@assets/icon/call.svg'
import EmailSvg from '@assets/icon/mail.svg'
import PasswordSvg from '@assets/icon/access.svg'
import EyeIconSvg from '@assets/icon/view.svg'
import EyeIconOffSvg from '@assets/icon/view-off.svg'
import { createUserProfile } from '@services/UserService'
import { useAuth } from '@hooks/useAuth'

type FormDataProps = {
  name: string
  phone: string
  email: string
  avatarId?: string | null
  password: string
  passwordConfirmation: string
}

const signUpSchema = yup.object({
  name: yup.string().required('Informe o nome'),
  phone: yup.string().required('Informe o telefone').min(11, 'Número inválido'),
  email: yup.string().required('Informe o e-mail').email('E-mail inválido'),
  avatarId: yup.string().nullable(),
  password: yup
    .string()
    .required('Informe a senha')
    .min(6, 'A senha deve ter pelo menos 6 dígitos'),
  passwordConfirmation: yup
    .string()
    .required('Confirme a senha')
    .oneOf([yup.ref('password'), ''], 'As senhas não conferem'),
})

export function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)

  const navigation = useNavigation()
  const toast = useToast()
  const { signIn } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
  })

  const handleGoBack = () => {
    navigation.goBack()
  }

  const handlePasswordState = () => {
    setShowPassword((showState) => {
      return !showState
    })
  }

  const handlePasswordConfirmState = () => {
    setShowPasswordConfirm((showState) => {
      return !showState
    })
  }

  const handleSignUp = async ({
    name,
    phone,
    email,
    avatarId = null,
    password,
    passwordConfirmation,
  }: FormDataProps) => {
    try {
      const { seller } = await createUserProfile({
        name,
        phone,
        email,
        avatarId,
        password,
        passwordConfirmation,
      })

      if (seller.id) {
        await signIn(seller.email, password)
      }

      // const response = await api.post('/sellers', {
      //   name,
      //   phone,
      //   email,
      //   avatarId,
      //   password,
      //   passwordConfirmation,
      // })
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível criar a conta. Tente novamente mais tarde.'
      toast.show({
        placement: 'top',
        render: ({ id }) => (
          <ToastMessage
            id={id}
            title={title}
            action="error"
            onClose={() => toast.close(id)}
          />
        ),
      })
    }
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
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Seu nome completo"
                label="Nome"
                leftIcon={UserSvg}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="(00) 00000-0000"
                label="Telefone"
                leftIcon={PhoneSvg}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.phone?.message}
                keyboardType="phone-pad"
              />
            )}
          />

          <Heading fontFamily="$title" fontWeight="$bold" fontSize="$md">
            Acesso
          </Heading>
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
              />
            )}
          />
          <Controller
            control={control}
            name="passwordConfirmation"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Confirme a senha"
                label="Confirmar senha"
                leftIcon={PasswordSvg}
                rightIcon={showPasswordConfirm ? EyeIconSvg : EyeIconOffSvg}
                secureTextEntry={!showPasswordConfirm}
                showPassword={handlePasswordConfirmState}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.passwordConfirmation?.message}
                onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType="send"
              />
            )}
          />
          <Button title="Cadastrar" icon onPress={handleSubmit(handleSignUp)} />
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
