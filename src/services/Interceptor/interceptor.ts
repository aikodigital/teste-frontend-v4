import axios from 'axios'
import { useAuthStore } from 'src/stores/equipment'
import * as AuthService from 'src/services/AuthService'
import { globalRouter } from 'src/router/globalRouter'
import { Loading } from 'quasar'
import { triggerNegative } from 'src/utils/triggers'
import { environment } from 'src/environment/environment'

const auth = useAuthStore()

const cancelTokenSource = axios.CancelToken.source()

const instance = axios.create({
  baseURL: environment.baseUrl,
})

// Request interceptor for API calls
instance.interceptors.request.use(
  async (config) => {
    const { token } = auth.authData
    if (token) {
      config.headers['Authorization'] = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor for API calls
instance.interceptors.response.use(
  (response) => {
    const { refreshtoken } = response.headers
    if (refreshtoken) {
      auth.storageAuthTokenSave({
        ...auth.authData,
      })
    }
    return response
  },
  async (error) => {
    if (import.meta.env.MODE === 'development') {
      console.error('ERRO INTERCEPTOR:', error)
    }

    if (
      error.response &&
      (error.response.status === 401 ||
        ['TokenExpiredError', 'JsonWebTokenError'].includes(error.response.data?.message?.name))
    ) {
      cancelTokenSource.cancel('Sessão expirada ou erro no servidor. Usuário sendo deslogado.')
      triggerNegative('Token expirado! Por favor, faça o login novamente.')
      const originalConfig = error.config
      originalConfig.headers['x-access-token'] = ''
      AuthService.signOut()
      Loading.hide()
      globalRouter.router?.push('/login')

      return new Promise(() => {
        return
      })
    }
    return Promise.reject(error)
  },
)

export { instance }
