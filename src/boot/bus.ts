import { EventBus } from 'quasar'
import { boot } from 'quasar/wrappers'
import 'mapbox-gl/dist/mapbox-gl.css'

export default boot(({ app }) => {
  const bus = new EventBus()
  app.provide('bus', bus)
})
