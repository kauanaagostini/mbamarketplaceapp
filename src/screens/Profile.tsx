import { useState } from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'
import { Controller, useForm } from 'react-hook-form'
import { Box, Heading, HStack, useToast, VStack } from '@gluestack-ui/themed'
import { gluestackUIConfig } from '../../config/gluestack-ui.config'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'

import { UserPhoto } from '@components/UserPhoto'
import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { ToastMessage } from '@components/ToastMessage'

import defaultUserPhotoImg from '@assets/image-upload-full.png'
import LogOut from '@assets/icon/logout.svg'
import UserFocusSvg from '@assets/icon/user-focus.svg'
import PhoneFocusSvg from '@assets/icon/call-focus.svg'
import EmailFocusSvg from '@assets/icon/mail-focus.svg'
import PasswordSvg from '@assets/icon/access.svg'
import EyeIconSvg from '@assets/icon/view.svg'
import EyeIconOffSvg from '@assets/icon/view-off.svg'

type FormDataProps = {
  name: string
  phone: string
  email?: string
  password?: string
  new_password?: string | null
}

const profileSchema = yup.object({
  name: yup.string().required('Informe o nome'),
  phone: yup.string().required('Informe o telefone'),
  email: yup.string(),
  password: yup.string(),
  new_password: yup
    .string()
    .min(6, 'A senha deve ter pelo menos 6 dígitos')
    .nullable()
    .transform((value) => (!!value ? value : null)),
})

export function Profile() {
  const { tokens } = gluestackUIConfig
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [userPhoto, setUserPhoto] = useState(
    'https:github.com/kauanaagostini.png'
  )

  const toast = useToast()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      name: 'Kauana',
      phone: '(11) 99999-6666',
      email: 'kauana@exemplo.com.br',
    },
  })

  const handlePasswordState = () => {
    setShowPassword((showState) => {
      return !showState
    })
  }

  const handleNewPasswordState = () => {
    setShowNewPassword((showState) => {
      return !showState
    })
  }

  const handleUserPhotoSelect = async () => {
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      })

      if (photoSelected.canceled) {
        return
      }

      const photoInfo = photoSelected.assets[0]

      if (photoInfo.uri) {
        const photoInfoURI = photoInfo.uri
        const photoInfoSize = (await FileSystem.getInfoAsync(photoInfoURI)) as {
          size: number
        }
        if (photoInfoSize.size && photoInfoSize.size / 1024 / 1024 > 5) {
          return toast.show({
            placement: 'top',
            render: ({ id }) => (
              <ToastMessage
                id={id}
                action="error"
                title="Essa imagem é muito grande."
                description="Escolha uma de até 5MB"
                onClose={() => toast.close(id)}
              />
            ),
          })
        }
        setUserPhoto(photoInfoURI)
        console.log(photoInfoSize.size)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdateProfile = (data: FormDataProps) => {
    console.log(data)
  }

  return (
    <VStack mt="$24" px="$10">
      <ScrollView showsVerticalScrollIndicator={false}>
        <HStack gap="$16" justifyContent="flex-end" mb="$5">
          <TouchableOpacity activeOpacity={0.8} onPress={handleUserPhotoSelect}>
            <UserPhoto
              source={{ uri: userPhoto }}
              alt="Imagem do usuário"
              size="xl"
              backgroundColor="$shape"
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.6}>
            <Box
              borderColor="$danger"
              borderWidth={1}
              rounded={10}
              w={40}
              h={40}
              justifyContent="center"
              alignItems="center"
            >
              <LogOut fill={tokens.colors.danger} width={20} height={20} />
            </Box>
          </TouchableOpacity>
        </HStack>
        <VStack flex={1} gap="$5">
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Seu nome completo"
                label="Nome"
                leftIcon={UserFocusSvg}
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
                leftIcon={PhoneFocusSvg}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.phone?.message}
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
                label="e-mail"
                leftIcon={EmailFocusSvg}
                placeholder="Seu e-mail"
                isReadyOnly
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange } }) => (
              <Input
                label="senha atual"
                leftIcon={PasswordSvg}
                placeholder="Sua senha"
                rightIcon={showPassword ? EyeIconSvg : EyeIconOffSvg}
                secureTextEntry={!showPassword}
                showPassword={handlePasswordState}
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="new_password"
            render={({ field: { onChange } }) => (
              <Input
                label="nova senha"
                leftIcon={PasswordSvg}
                placeholder="Sua nova senha"
                rightIcon={showNewPassword ? EyeIconSvg : EyeIconOffSvg}
                secureTextEntry={!showNewPassword}
                showPassword={handleNewPasswordState}
                onChangeText={onChange}
                errorMessage={errors.new_password?.message}
                onSubmitEditing={handleSubmit(handleUpdateProfile)}
                returnKeyType="send"
              />
            )}
          />
          <Button
            title="Atualizar Cadastro"
            onPress={handleSubmit(handleUpdateProfile)}
          />
        </VStack>
      </ScrollView>
    </VStack>
  )
}
