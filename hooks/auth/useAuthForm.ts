import { useState, useRef } from "react"
import { loginService, registerService, sendOauthData } from "@/services/authServices"
import { useRouter } from "next/navigation"
import { getSession, signIn } from "next-auth/react"
import { ErrorSchema } from "@/types/errorSchema"

interface userdataProps {
  email: string
  username: string;
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
    if (!value.trim()) return "Email Tidak Boleh Kosong"
    if (!emailRegex.test(value)) return "Format Email Tidak Valid"
    return ""
  }

  const validateHandphone = (value: string) => {
    if (!value.trim()) return "Nomor Telepon Tidak Boleh Kosong"
    if (!/^08\d{8,12}$/.test(value)) return "Nomor Telepon Harus Diawali 08 dan Terdiri Dari 10-14 Digit Angka"
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
          const success = response?.error_schema?.error_message === "SUCCESS"

          if (success) {
            localStorage.clear()
            const { token, customer_id, username, image } = response.output_schema || {}

            document.cookie = `token=${token}; path=/; Secure; SameSite=Lax`
            document.cookie = `customerId=${customer_id}; path=/; Secure; SameSite=Lax`

            localStorage.setItem("username", username || "")
            localStorage.setItem("image", image || "")
            // localStorage.setItem("token", token || "")
            // localStorage.setItem("customerId", customer_id || "")

            window.location.href = "/"
          } else if (response?.error_schema?.error_code === "PS-00-002") {
            setAuthError("Email atau Password Tidak Sesuai")
          }
        })
      } else if (type === "register" && isChecked) {
        await registerService(data, (response) => {
          const success = response?.error_schema?.error_message === "SUCCESS"

          if (success) {
            localStorage.clear()
            const { customer_id, status } = response.output_schema || {}
            const contactKey = data.email ? "email" : "phone_number"
            const contactValue = data.email || data.phone_number

            localStorage.setItem(contactKey, contactValue)
            // localStorage.setItem("customerId", customer_id || "Tidak ada user id")
            document.cookie = `status=${status}; path=/; Secure; SameSite=Lax`
            // document.cookie = `token=${token}; path=/; Secure; SameSite=Lax`
            document.cookie = `customerId=${customer_id}; path=/; Secure; SameSite=Lax`

            if (status === "REGISTERED") {
              router.push("/input-biodata")
            } else if (status === "VERIFY_OTP") {
              router.push("/otp")
            } else {
              router.push("/not-found")
            }
          } else {
            setAuthError(response?.error_schema?.error_message || "Terjadi kesalahan")
          }
        })
      }
    } catch (error) {
      const err = error as { error_schema: ErrorSchema }
      console.log(err)
      if (err.error_schema.error_code === "PS-01-002") {
        setAuthError("Email Sudah Terdaftar")
      } else if (err.error_schema.error_code === "PS-00-002") {
        setAuthError("Email Atau Password Tidak Sesuai")
      } else if (err.error_schema.error_code === "PS-99-500") {
        setAuthError("Email Atau Password Tidak Sesuai")
      }
    } finally {
      localStorage.setItem("otp_type", "register")
      setIsLoading(false)
    }
  }

  const loginGoogleHandler = async () => {
    try {
      console.log("Login with Google")
      const response = await signIn("google", {
        callbackUrl: "/oauth-checking",
        redirect: false,
      })

      console.log("Login with Google Response:", response)
      if (response?.ok) {
        const session = await getSession()

        if (session?.user) {
          const userData: userdataProps = {
            username: session.user.name || "Guest",
            email: session.user.email || "",
            profilePicture: session.user.image || "/default-profile.png",
          }

          //DISINI MINTA ENDPOINT BALIKAN
          await sendOauthData(userData, (response) => {
            if (response.error_schema?.error_message === "SUCCESS") {
              document.cookie = `customerId=${response.output_schema.customer_id}; path=/; Secure; SameSite=Lax`
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
