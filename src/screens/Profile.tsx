import { useState } from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'
import { Box, Heading, HStack, VStack } from '@gluestack-ui/themed'
import { gluestackUIConfig } from '../../config/gluestack-ui.config'

import { UserPhoto } from '@components/UserPhoto'
import { Input } from '@components/Input'
import { Button } from '@components/Button'

import defaultUserPhotoImg from '@assets/user-orange.png'
import LogOut from '@assets/icon/logout.svg'
import UserFocusSvg from '@assets/icon/user-focus.svg'
import PhoneFocusSvg from '@assets/icon/call-focus.svg'
import EmailFocusSvg from '@assets/icon/mail-focus.svg'
import PasswordSvg from '@assets/icon/access.svg'
import EyeIconSvg from '@assets/icon/view.svg'
import EyeIconOffSvg from '@assets/icon/view-off.svg'

export function Profile() {
  const { tokens } = gluestackUIConfig
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

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

  return (
    <VStack mt="$24" px="$10">
      <ScrollView showsVerticalScrollIndicator={false}>
        <HStack gap="$16" justifyContent="flex-end" mb="$5">
          <TouchableOpacity activeOpacity={0.8}>
            <UserPhoto
              source={defaultUserPhotoImg}
              alt="Imagem do usuário"
              size="xl"
              backgroundColor="$shape"
              borderColor="$gray300"
              borderWidth={0.2}
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
