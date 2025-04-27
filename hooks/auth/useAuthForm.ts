import { useState, useRef } from "react"
import { loginService, registerService, sendOauthData } from "@/services/authServices"
import { useRouter } from "next/navigation"
import { getSession, signIn } from "next-auth/react"

interface userdataProps {
  email: string
  // username: string;
  profilePicture: string
}

export const useAuthForm = (type?: string) => {
  const [emailOrPhone, setEmailOrPhone] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [emailOrPhoneError, setEmailOrPhoneError] = useState<string>("")
  const [passwordError, setPasswordError] = useState<string>("")
  const [authError, setAuthError] = useState<string>("")
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const [username, setUsername] = useState("")
  const [fullname, setFullname] = useState("")
  const [handphone, setHandphone] = useState("")
  const [gender, setGender] = useState("Laki-Laki")
  const [profileImage, setProfileImage] = useState<string>("")
  const [date, setDate] = useState<Date | undefined>(undefined)

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!value.trim()) return "Email tidak boleh kosong"
    if (!emailRegex.test(value)) return "Format email tidak valid"
    return ""
  }

  const validateHandphone = (value: string) => {
    if (!value.trim()) return "Handphone tidak boleh kosong"
    if (!/^08\d{8,12}$/.test(value)) return "Nomor HP harus diawali 08 dan terdiri dari 10-14 digit"
    return ""
  }

  const validatePassword = (value: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{12,20}$/
    if (!value.trim()) return "Password tidak boleh kosong"
    if (!passwordRegex.test(value)) return "Password harus 12-20 karakter, mengandung huruf besar, huruf kecil, dan angka."
    return ""
  }

  const validateEmailOrPhone = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phoneRegex = /^08\d+/

    if (emailRegex.test(value)) {
      return ""
    }

    if (phoneRegex.test(value)) {
      if (value.length < 10 || value.length > 13) {
        return "Nomor HP hanya boleh angka, dimulai dengan '08', dan terdiri dari 10-13 digit."
      }
      return ""
    }

    if (!value.trim()) {
      return "Mohon Untuk Mengisi Nomor HP atau Email Anda"
    }

    return "Email harus dalam format “example@email.com”"
  }

  const handleEmailOrPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmailOrPhone(value)
    setEmailOrPhoneError("")
    setPasswordError("")
    setAuthError("")
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPassword(value)
    setEmailOrPhoneError("")
    setPasswordError("")
    setAuthError("")
  }

  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setEmailOrPhoneError("")
    setPasswordError("")
    setAuthError("")

    if (type === "register") {
      const emailOrPhoneValidationError = validateEmailOrPhone(emailOrPhone)
      if (emailOrPhoneValidationError) {
        setEmailOrPhoneError(emailOrPhoneValidationError)
        return
      }
    }

    if (type === "login") {
      if (!emailOrPhone) {
        setEmailOrPhoneError("Mohon Untuk Mengisi Nomor HP atau Email Anda Telebih Dahulu")
        return
      }
      if (!password) {
        setPasswordError("Mohon Untuk Mengisi Password Anda Telebih Dahulu")
        return
      }
    }

    setEmailOrPhoneError("")
    setPasswordError("")

    const data = {
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailOrPhone) ? emailOrPhone : "",
      phone_number: /^08\d+/.test(emailOrPhone) ? emailOrPhone : "",
    }

    try {
      setIsLoading(true)
      if (type === "login") {
        await loginService({ ...data, password }, (response) => {
          if (response.error_schema.error_message === "SUCCESS") {
            console.log("login token:" + response?.output_schema?.token)
            console.log("login customerId:" + response?.output_schema?.customer_id)
            document.cookie = `token=${response?.output_schema?.token}; path=/; Secure; SameSite=Lax`
            document.cookie = `customerId=${response?.output_schema?.customer_id}; path=/; Secure; SameSite=Lax`
            localStorage.setItem("username", response?.output_schema?.username)
            localStorage.setItem("image", response?.output_schema?.image)
            localStorage.setItem("token", response?.output_schema?.token)
            localStorage.setItem("customerId", response?.output_schema?.customer_id)
            console.log("Valid input, masuk ke Dashboard")
            router.push("/")
          } else {
            setAuthError(response?.error_schema?.error_message || " ")
          }
        })
      } else if (type === "register" && isChecked) {
        await registerService(data, (response) => {
          if (response.error_schema?.error_message === "SUCCESS") {
            console.log("Valid input, masuk ke OTP...")
            localStorage.setItem(data.email ? "email" : "phone_number", data.email || data.phone_number)
            document.cookie = `status=${response?.output_schema?.status}; path=/; Secure; SameSite=Lax`
            localStorage.setItem("customerId", response?.output_schema?.customer_id || "Tidak ada user id")
            router.push("/otp")
          } else {
            setAuthError(response?.error_schema?.error_message || " ")
          }
        })
      }
    } catch (error) {
      const err = error as { status: number }

      if (err.status === 401) {
        setAuthError("Username atau Password Tidak Sesuai")
      } else {
        setAuthError("Terjadi kesalahan saat login")
      }
    } finally {
      localStorage.setItem("otpType", "register")
      setIsLoading(false)
    }
  }

  const loginGoogleHandler = async () => {
    try {
      const response = await signIn("google", {
        callbackUrl: "/",
        redirect: false,
      })

      if (response?.ok) {
        const session = await getSession()

        if (session?.user) {
          const userData: userdataProps = {
            // username: session.user.name || "Guest",
            email: session.user.email || "",
            profilePicture: session.user.image || "/default-profile.png",
          }

          await sendOauthData(userData, (response) => {
            if (response.error_schema?.error_message === "SUCCESS") {
              document.cookie = `userId=${response.output_schema.user_id}; path=/; Secure; SameSite=Lax`
              router.push("/input-biodata")
            }
          })
        }
      }
    } catch (error) {
      console.error("Error during login:", error)
    }
  }

  return {
    emailOrPhone,
    password,
    isLoading,
    validatePassword,
    validateEmailOrPhone,
    emailOrPhoneError,
    setEmailOrPhoneError,
    passwordError,
    authError,
    isChecked,
    inputRef,
    handleEmailOrPhoneChange,
    handlePasswordChange,
    handleCheckboxChange,
    handleSubmit,
    loginGoogleHandler,
    username,
    fullname,
    handphone,
    gender,
    date,
    validateHandphone,
    validateEmail,
    profileImage,
    setUsername,
    setFullname,
    setHandphone,
    setGender,
    setDate,
    setProfileImage,
  }
}
