 import { MantineProvider } from '@mantine/core'
import HomePage from './screens/home'

export default function Home() {
  return (
    <MantineProvider forceColorScheme='dark' withNormalizeCSS> 
       <HomePage />
    </MantineProvider>
  )
}
