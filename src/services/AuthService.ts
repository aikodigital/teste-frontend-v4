import { instance } from 'src/services/Interceptor/interceptor'
import { useAuthStore } from 'src/stores/equipment'

export function Login(data: any) {
  return instance.post('/api/login', data)
}

export function GetUser() {
  return instance.get('/api/user/autenticado')
}

export function signOut() {
  const auth = useAuthStore()
  auth.storageAuthTokenRemove()
}
