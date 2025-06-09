"use client"

import { useEffect, useState } from "react"
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { cn } from "@/lib/utils"
import Image from "next/image"
import OtpShield from "@/public/otp-shield.svg"
import OtpImage from "@/public/otp.svg"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp"
import axios from "axios"
import { otpBaseUrl } from "@/types/globalVar"
import LoadingPopup from "../LoadingPopUp"
import { useAuth } from "@/hooks/auth/useAuth"

interface OtpFormProps {
  className?: string
}

interface ErrorSchema {
  error_code: string
  error_message: string
}

interface OtpAccessValid {
  error_schema: ErrorSchema
  output_schema: {
    verify_count: number
    resend_otp_count: number
  }
}

interface OtpRequest {
  otp_code: string
  // verify_count: number;
  // resend_otp_count: number;
  customer_id: string
}

interface OtpRespone {
  error_schema: ErrorSchema
  output_schema: {
    customer_id: string
    username: string
    email: string
    phone_number: string
    verify_count: string
    resend_otp_count: string
    token: string
    duration: number
    status: string
  }
}

const OtpForm = ({ className }: OtpFormProps) => {
  const router = useRouter()
  const [otp, setOtp] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [timer, setTimer] = useState(30)
  const [isResendDisabled, setIsResendDisabled] = useState(true)
  const [verifyCount, setVerifyCount] = useState(0)
  const [resendOtpCount, setResendOtpCount] = useState(0)
  const [email, setEmail] = useState<string | null>(null)
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null)
  const {customerId} = useAuth();

  useEffect(() => {
    const storedEmail = localStorage.getItem("email")
    const storedPhoneNumber = localStorage.getItem("phone_number")

    setEmail(storedEmail)
    setPhoneNumber(storedPhoneNumber)
  }, [])

  const fetchOtpValidity = async () => {
    try {
      const response = await axios.get<OtpAccessValid>(`${otpBaseUrl}/valid?customerId=${customerId}`)
      setVerifyCount(response.data.output_schema.verify_count)
      setResendOtpCount(response.data.output_schema.resend_otp_count)

      if (response.data.output_schema.verify_count == 10) {
        router.push("/")
      }
    } catch (error) {
      console.error("Error fetching OTP access validity:", error)
    }
  }

  useEffect(() => {
    fetchOtpValidity()
  }, [])

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const response = await axios.get<OtpAccessValid>(
  //         `${otpBaseUrl}/valid?customerId=${localStorage.getItem(
  //           "userId"
  //         )}`
  //       );
  //       setVerifyCount(response.data.output_schema.verify_count);
  //       setResendOtpCount(response.data.output_schema.resend_otp_count);
  //       if (verifyCount > 10) {
  //         console.log("salah mulu otp lu cuy");
  //         router.push("/");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching OTP access validity:", error);
  //     }
  //   })();
  // }, []);

  const otpSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      if (!customerId) {
        setError("User ID tidak ditemukan.")
        setIsLoading(false)
        return
      }

      const otp_type = localStorage.getItem("otp_type");

      const payload: OtpRequest = {
        otp_code: otp,
        // verify_count: verifyCount,
        // resend_otp_count: resendOtpCount,
        customer_id: customerId,
      }

      const response = await axios.post<OtpRespone>(`${otpBaseUrl}/verify`, payload)

      if (response.data.error_schema?.error_message === "SUCCESS") {
        document.cookie = "status=otp_verify; path=/; Secure; SameSite=Lax"
        localStorage.removeItem("username")
        localStorage.removeItem("password")
        
        if(localStorage.getItem("email")) localStorage.setItem("register_by", "email")
        else localStorage.setItem("register_by", "phone_number")
      
        if(otp_type === "register"){
          router.push("/input-biodata")
        }else if (otp_type === "reset_password") {
          router.push("/reset-password")
        }else{
          router.push("/not-found")
        }

      } else {
        if(verifyCount >= 10)router.push("/");
        setError("OTP yang diinput tidak sesuai")
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat verifikasi OTP:", error)
      setError("OTP Tidak Sesuai")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOtp = async () => {
    try {
      setIsResendDisabled(true)
      setError("")

      if (!customerId) {
        console.error("User ID tidak ditemukan di localStorage.")
        return
      }

      const response = await axios.post(`${otpBaseUrl}/resend?customerId=${customerId}`, "")

      if (response.data.error_schema?.error_message === "SUCCESS") {
        setVerifyCount(response.data.output_schema.verify_count)
        setResendOtpCount(response.data.output_schema.resend_otp_count)
        setTimer(30) 
      } else {
        setError("Gagal mengirim ulang OTP")
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat mengirim ulang OTP:", error)
      setError("Terjadi kesalahan saat mengirim ulang OTP")
    }
  }

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(interval)
    } else {
      if (resendOtpCount < 3) {
        setIsResendDisabled(false)
      }
    }
  }, [timer, resendOtpCount])

  return (
    <div className={cn("flex justify-center w-full h-full max-w-[1280px] max-h-[726px] mx-auto", className)}>
      <Card className='w-full flex p-1 md:p-5 rounded-3xl'>
        <div className='hidden md:block md:w-3/5 self-center'>
          <Image
            src={OtpImage}
            width={500}
            height={400}
            alt='auth'
            className='justify-self-center object-contain'
          />
        </div>

        <div className='w-full md:w-2/5 p-7'>
          <CardHeader className='flex flex-col items-center'>
            <Image
              src={OtpShield}
              width={67}
              height={77}
              alt='auth'
              className='justify-self-center object-contain'
            />
            <CardTitle>
              <h2 className='text-[18px] lg:text-[24px] xl:text-[32px] text-center font-semibold mt-2 text-color-primary text-nowrap'>Enter The Verification Code</h2>
            </CardTitle>
            <CardDescription className='text-[12px] xs:text-[15px] sm:text-[16px] md:text-[14px] lg:text-[16px] xl:text-[20px] text-color-primary '>
              <h4 className='text-center  mt-2'>
                Verification code sent via {email ? "email" : "WhatsApp"} to {email || phoneNumber}
              </h4>
            </CardDescription>
          </CardHeader>

          <CardContent className='flex flex-col items-center justify-center w-full mt-2'>
            <form
              onSubmit={otpSubmitHandler}
              className='w-full flex flex-col items-center'
            >
              <InputOTP
                maxLength={4}
                pattern={REGEXP_ONLY_DIGITS}
                value={otp}
                onChange={(value) => setOtp(value)}
              >
                <InputOTPSlot
                  index={0}
                  className='w-12 h-12 text-[#73787B] text-center outline-none'
                />
                <InputOTPSlot
                  index={1}
                  className='w-12 h-12 text-[#73787B] text-center outline-none'
                />
                <InputOTPSlot
                  index={2}
                  className='w-12 h-12 text-[#73787B] text-center outline-none'
                />
                <InputOTPSlot
                  index={3}
                  className='w-12 h-12 text-[#73787B] text-center outline-none'
                />
              </InputOTP>

              {error && <p className='text-red-600 text-xs md:text-lg mt-3 '>{error}</p>}

              {isLoading && <LoadingPopup message={"Memverifikasi kode OTP Anda..."} />}

              <Button
                onClick={async () => {
                  const response = await axios.get<OtpAccessValid>(`${otpBaseUrl}/valid?customerId=${customerId}`)
                  setVerifyCount(response.data.output_schema.verify_count)
                  setResendOtpCount(response.data.output_schema.resend_otp_count)
                  if (verifyCount > 10) {
                    router.push("/")
                  }
                }}
                type='submit'
                className='w-full max-w-[440px] mt-10 h-[50px] rounded-xl text-[12px] lg:text-[16px] xl:text[18px] bg-custom-gradient-tr hover:opacity-80'
                disabled={isLoading || otp.length !== 4}
              >
                Konfirmasi
              </Button>
            </form>

            <div className='mt-5 text-[11px] xs:text-[12px] sm:text-[13px] md:text-[12px] lg:text-[14px] xl:text-[15px] text-color-primary text-center'>
              {timer > 0 ? (
                <h4>
                  Tunggu <span className='font-bold text-color-secondary'>{timer} detik</span> untuk kirim ulang OTP
                </h4>
              ) : (
                <h4>
                  {resendOtpCount >= 3 ? (
                    <span className='text-red-500 font-semibold'>Kesempatan minta OTP telah habis</span>
                  ) : (
                    <>
                      Tidak menerima OTP?{" "}
                      <button
                        onClick={handleResendOtp}
                        className='text-color-primaryDark font-semibold hover:opacity-80'
                        disabled={isResendDisabled}
                      >
                        <span className='font-bold text-color-secondary'>kirim ulang</span>
                      </button>
                    </>
                  )}
                </h4>
              )}
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  )
}

export default OtpForm
