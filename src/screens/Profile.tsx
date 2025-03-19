import { useState } from 'react'
import { Alert, ScrollView, TouchableOpacity } from 'react-native'
import { Box, Heading, HStack, useToast, VStack } from '@gluestack-ui/themed'
import { gluestackUIConfig } from '../../config/gluestack-ui.config'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'

import { UserPhoto } from '@components/UserPhoto'
import { Input } from '@components/Input'
import { Button } from '@components/Button'

import defaultUserPhotoImg from '@assets/image-upload-full.png'
import LogOut from '@assets/icon/logout.svg'
import UserFocusSvg from '@assets/icon/user-focus.svg'
import PhoneFocusSvg from '@assets/icon/call-focus.svg'
import EmailFocusSvg from '@assets/icon/mail-focus.svg'
import PasswordSvg from '@assets/icon/access.svg'
import EyeIconSvg from '@assets/icon/view.svg'
import EyeIconOffSvg from '@assets/icon/view-off.svg'
import { ToastMessage } from '@components/ToastMessage'

export function Profile() {
  const { tokens } = gluestackUIConfig
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [userPhoto, setUserPhoto] = useState(
    'https:github.com/kauanaagostini.png'
  )

  const toast = useToast()

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
          <Input
            label="nome"
            leftIcon={UserFocusSvg}
            value="Kauana"
            placeholder="Seu nome completo"
          />
          <Input
            label="telefone"
            leftIcon={PhoneFocusSvg}
            value="(55) 99999-9999"
            placeholder="(00) 00000-0000"
          />
          <Heading fontFamily="$title" fontWeight="$bold" fontSize="$md">
            Acesso
          </Heading>
          <Input
            label="e-mail"
            leftIcon={EmailFocusSvg}
            value="kauana@email.com"
            placeholder="Seu e-mail"
            isReadyOnly
          />
          <Input
            label="senha atual"
            leftIcon={PasswordSvg}
            placeholder="Sua senha"
            rightIcon={showPassword ? EyeIconSvg : EyeIconOffSvg}
            secureTextEntry={!showPassword}
            showPassword={handlePasswordState}
          />
          <Input
            label="nova senha"
            leftIcon={PasswordSvg}
            placeholder="Sua nova senha"
            rightIcon={showNewPassword ? EyeIconSvg : EyeIconOffSvg}
            secureTextEntry={!showNewPassword}
            showPassword={handleNewPasswordState}
          />
          <Button title="Atualizar Cadastro" />
        </VStack>
      </ScrollView>
    </VStack>
  )
}
