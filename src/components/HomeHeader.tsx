import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Box, Heading, HStack, Text, VStack } from '@gluestack-ui/themed'
import { gluestackUIConfig } from '../../config/gluestack-ui.config'

import { UserPhoto } from './UserPhoto'

import { AppNavigatorRoutesProps } from '@routes/app.routes'

import ArrowRightSvg from '@assets/icon/arrow-right.svg'
import defaultUserPhotoImg from '@assets/image-upload-full.png'

export function HomeHeader() {
  const { tokens } = gluestackUIConfig
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  const handleProfile = () => {
    navigation.navigate('profile')
  }

  return (
    <HStack gap="$6" alignItems="center">
      <UserPhoto
        source={defaultUserPhotoImg}
        alt="Imagem do usuário"
        w={56}
        h={56}
        backgroundColor="$background"
      />
      <VStack>
        <Heading
          fontFamily="$title"
          fontWeight="$bold"
          fontSize="$md"
          color="$gray500"
        >
          Olá, Kauana!
        </Heading>
        <TouchableOpacity onPress={handleProfile}>
          <HStack gap="$2">
            <Text
              fontFamily="$action"
              fontWeight="$medium"
              fontSize="$sm"
              color="$orangeBase"
            >
              Ver perfil
            </Text>
            <ArrowRightSvg
              width={20}
              height={20}
              fill={tokens.colors.orangeBase}
            />
          </HStack>
        </TouchableOpacity>
      </VStack>
    </HStack>
  )
}
