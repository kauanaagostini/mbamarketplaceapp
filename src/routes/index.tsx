import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { Box } from '@gluestack-ui/themed'
import { gluestackUIConfig } from '../../config/gluestack-ui.config'

import { useAuth } from '@hooks/useAuth'
import { AuthRoutes } from './auth.routes'
import { AppRoutes } from './app.routes'

export function Routes() {
  const theme = DefaultTheme
  theme.colors.background = gluestackUIConfig.tokens.colors.background

  const { user } = useAuth()

  return (
    <Box flex={1} bg="$shape">
      <NavigationContainer theme={theme}>
        {user.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  )
}
