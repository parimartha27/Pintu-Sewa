import { useState, useEffect } from 'react';

const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const getCookie = (name: string) => {
      if (typeof window === 'undefined') return null;
      const match = document.cookie.match(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`);
      return match ? decodeURIComponent(match[2]) : null;
    };
    
    setToken(getCookie('token'));
    setUserId(getCookie('userId'));
  }, []);

  return { token, userId };
};

export default useAuth;