import React from 'react'
import { VStack, Text, HStack, Box } from '@gluestack-ui/themed'
import { gluestackUIConfig } from '../../config/gluestack-ui.config'

import { Input } from '@components/Input'

import SearchIconSvg from '@assets/icon/search.svg'
import FilterIconSvg from '@assets/icon/filter-vertical.svg'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'

type Props = TouchableOpacityProps

export function SearchProducts({ ...rest }: Props) {
  const { tokens } = gluestackUIConfig
  return (
    <VStack>
      <Text>Explore produtos</Text>
      <HStack gap="$6" alignItems="flex-end">
        <Input leftIcon={SearchIconSvg} placeholder="Pesquisar" width="80%" />
        <TouchableOpacity {...rest}>
          <Box
            borderColor="$orangeBase"
            borderWidth={1}
            rounded={10}
            w={40}
            h={40}
            justifyContent="center"
            alignItems="center"
          >
            <FilterIconSvg
              fill={tokens.colors.orangeBase}
              width={20}
              height={20}
            />
          </Box>
        </TouchableOpacity>
      </HStack>
    </VStack>
  )
}
