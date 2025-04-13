import axios from "axios";
import { authBaseUrl } from "@/types/globalVar";

interface LoginData {
  email: string;
  phone_number: string;
  password: string;
}

interface RegisterData {
  email: string;
  phone_number: string;
}

interface RegisterResponse {
  error_schema?: ErrorSchema;
  output_schema?: {
    email?: string;
    phoneNumber?: string;
    customer_id?: string;
    status?: string
  };
}

interface ErrorSchema {
  error_code: string;
  error_message: string;
}

interface LoginResponse {
  error_schema: ErrorSchema;
  output_schema: {
    customer_id: string;
    username: string;
    email: string;
    phone_number: string;
    token: string;
    duration:number;
    image: string;
  };
}

interface ValidateOtpResponse {
  error_schema: ErrorSchema;
  output_schema: null;
}

interface OauthPayload {
  // username: string;
  email: string;
  profilePicture: string;
}

interface OauthResponse {
  error_schema: ErrorSchema;
  output_schema: {
    email?: string;
    phone_number?: string;
    user_id?: string;
    status?: string
  };
}

export async function sendOauthData(
  userData: OauthPayload,
  callback: (response: OauthResponse) => void
): Promise<OauthResponse> {
  try {
    const response = await axios.post<OauthResponse>(
      `${authBaseUrl}/register/oauth`,
      userData
    );

    console.log("OAuth Request:", userData);
    console.log("OAuth Response:", response.data);

    // localStorage.setItem("username", response.data.output_schema.username);
    // localStorage.setItem("session", response.data.output_schema.session);

    callback(response.data);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error saving user data:",
        error.response?.data || error.message
      );
      throw error.response?.data || error.message;
    }
    throw new Error("An unexpected error occurred during OAuth login.");
  }
}

export async function loginService(
  data: LoginData,
  callback: (response: LoginResponse) => void
) {
  try {
    const response = await axios.post<LoginResponse>(
      `${authBaseUrl}/login`,
      data
    );
    console.log("Login Request:", data);
    console.log("Login Response:", response.data);
    callback(response.data);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    }
    throw new Error("An unexpected error occurred during login.");
  }
}

export async function registerService(
  data: RegisterData,
  callback: (response: RegisterResponse) => void
) {
  try {
    const response = await axios.post<RegisterResponse>(
      `${authBaseUrl}/register`,
      data
    );
    console.log("Register Request:", data);
    console.log("Register Response:", response.data);

    if (response.data.output_schema) {
      document.cookie = `status=${response.data.output_schema?.status || ""}; path=/; Secure; SameSite=Lax`;
      document.cookie = `userId=${response.data.output_schema?.customer_id || ""}; path=/; Secure; SameSite=Lax`;
    } else {
      console.warn("No output_schema in response");
    }
    callback(response.data);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    }
    throw new Error("An unexpected error occurred during registration.");
  }
}

export async function validateOtpService(
  otpConfirm: string,
  validOtp: string
): Promise<ValidateOtpResponse> {
  try {
    const response = await axios.post<ValidateOtpResponse>(
      `${authBaseUrl}/validate-otp`,
      {
        otp_confirm: otpConfirm,
        valid_otp: validOtp,
      }
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    }
    throw new Error("An unexpected error occurred during OTP validation.");
  }
}
