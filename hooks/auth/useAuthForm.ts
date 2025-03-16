import { useState, useRef } from "react";
import { loginService, registerService } from "@/services/authServices";
import { useRouter } from "next/navigation";

export const useAuthForm = (type?: string) => {
  const [emailOrPhone, setEmailOrPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [emailOrPhoneError, setEmailOrPhoneError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const validateEmailOrPhone = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^08\d+/;

    if (emailRegex.test(value)) {
      return "";
    }

    if (phoneRegex.test(value)) {
      if (value.length < 10 || value.length > 13) {
        return "Nomor HP hanya boleh angka, dimulai dengan '08', dan terdiri dari 10-13 digit.";
      }
      return "";
    }

    if (value === "") {
      return "Mohon Untuk Mengisi Nomor HP atau Email Anda";
    }

    return "Email harus dalam format “example@email.com”";
  };

  const validatePassword = (value: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{12,}$/;
    
    if(!value.trim())return "Field ini tidak boleh kosong";
    else if (!passwordRegex.test(value) || value.length > 20) return "Password harus minimal 12 karakter dan maksimal 20 karakter, mengandung huruf besar, huruf kecil, dan angka.";
    
    return "";

  };

  const handleEmailOrPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmailOrPhone(value);
    setEmailOrPhoneError("");
    setPasswordError("");
    setAuthError("");
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setEmailOrPhoneError("");
    setPasswordError("");
    setAuthError("");
  };

  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setEmailOrPhoneError("");
    setPasswordError("");
    setAuthError("");

    const emailOrPhoneValidationError = validateEmailOrPhone(emailOrPhone);
    if (emailOrPhoneValidationError) {
      setEmailOrPhoneError(emailOrPhoneValidationError);
      return;
    }

    if (type === "login") {
      if (!password) {
        setPasswordError("Field ini tidak boleh kosong");
        return;
      }
    }

    setEmailOrPhoneError("");
    setPasswordError("");

    const data = {
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailOrPhone) ? emailOrPhone : "",
      phone_number: /^08\d+/.test(emailOrPhone) ? emailOrPhone : "",
    };

    try {
      setIsLoading(true);
      if (type === "login") {
        await loginService({ ...data, password }, (response) => {
          if (response.error_schema.error_message === "SUCCESS") {
            console.log("Valid input, masuk ke Dashboard");
            router.push("/");
          }
        });
      } else if (type === "register" && isChecked) {
        await registerService(data, (response) => {
          if (response.error_schema.error_message === "SUCCESS") {
            console.log("Valid input, masuk ke OTP...");
            localStorage.setItem(data.email ? "email" : "phone_number", data.email || data.phone_number);
            router.push("/otp");
          }
        });
      }
    } catch (error) {
      setAuthError("ERROR TERGANTUNG NANTI");
      console.error("Error during authentication:", error);
    } finally {
      localStorage.setItem("otpType", "register");
      setIsLoading(false);
    }
  };

  const loginGoogleHandler = () => {
    console.log("Login with Google");
  };

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
    loginGoogleHandler
  };
};