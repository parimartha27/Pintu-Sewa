import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import axios from 'axios'

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

export const useAuthGuard = (
  options?: { redirectIfInvalid?: boolean } // opsional
): AuthDataProps => {
  const router = useRouter();
  const [authData] = useState<AuthDataProps>(() => ({
    token: Cookies.get("token") || null,
    customerId: Cookies.get("customerId") || null,
  }));

  useEffect(() => {
    const validateToken = async () => {
      const { token, customerId } = authData;

      if (!token || !customerId) {
        if (options?.redirectIfInvalid !== false) {
          router.replace("/login");
        }
        return;
      }

      try {
        const response = await axios.post("/api/auth/validate", {
          token,
          customerId,
        });

        if (!response.data.valid) {
          Cookies.remove("token");
          Cookies.remove("customerId");

          if (options?.redirectIfInvalid !== false) {
            router.replace("/login");
          }
        }
      } catch (error) {
        console.error("Token validation error:", error);
        if (options?.redirectIfInvalid !== false) {
          router.replace("/login");
        }
      }
    };

    validateToken();
  }, [authData, options?.redirectIfInvalid, router]);

  return authData;
};