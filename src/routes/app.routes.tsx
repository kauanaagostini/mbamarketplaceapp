import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import { Home } from '@screens/Home'
import { Product } from '@screens/Product'
import { Profile } from '@screens/Profile'

import HomeSvg from '@assets/icon/store.svg'
import ProfileSvg from '@assets/icon/profile.svg'
import { gluestackUIConfig } from '../../config/gluestack-ui.config'
import { Platform } from 'react-native'

type AppRoutes = {
  home: undefined
  profile: undefined
  product: undefined
  // product: { productId: string }
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator()

export function AppRoutes() {
  const { tokens } = gluestackUIConfig
  const iconSize = tokens.space['5']

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          fontFamily: tokens.fonts.label,
          fontWeight: tokens.fontWeights.medium,
          fontSize: tokens.fontSizes['2xs'],
          textTransform: 'uppercase',
          width: '100%',
          marginTop: 4,
        },
        tabBarActiveTintColor: tokens.colors.orangeBase,
        tabBarInactiveTintColor: tokens.colors.gray100,
        tabBarStyle: {
          backgroundColor: tokens.colors.white,
          borderTopWidth: 0,
          height: Platform.OS === 'android' ? 76 : 96,
          paddingBottom: tokens.space['6'],
          paddingTop: tokens.space['3'],
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarLabel: 'Produtos',
          tabBarIcon: ({ color }) => (
            <HomeSvg fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />
      <Screen
        name="profile"
        component={Profile}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color }) => (
            <ProfileSvg fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />
      <Screen
        name="product"
        component={Product}
        options={{ tabBarItemStyle: { display: 'none' } }}
      />
    </Navigator>
  )
}
