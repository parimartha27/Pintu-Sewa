import { useState } from 'react'
import Cookies from 'js-cookie'

export interface AuthDataProps {
  token: string | null
  customerId: string | null
}

export const useAuth = (): AuthDataProps => {
  const [authData] = useState<AuthDataProps>(() => ({
    token: Cookies.get('token') || null,
    customerId: Cookies.get('customerId') || null,
  }));

  return authData
}