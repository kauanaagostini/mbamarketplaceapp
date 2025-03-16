import { StatusBar } from 'react-native'
import { useFonts, DMSans_700Bold } from '@expo-google-fonts/dm-sans'
import {
  Poppins_400Regular,
  Poppins_500Medium,
} from '@expo-google-fonts/poppins'
import { GluestackUIProvider } from '@gluestack-ui/themed'
import { config } from './config/gluestack-ui.config'
import { Routes } from '@routes/index'
import { Loading } from '@components/Loading'

export default function App() {
  const [fontsLoaded] = useFonts({
    DMSans_700Bold,
    Poppins_400Regular,
    Poppins_500Medium,
  })

  return (
    <GluestackUIProvider config={config}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? <Routes /> : <Loading />}
    </GluestackUIProvider>
  )
}
