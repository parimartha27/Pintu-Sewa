import axios from "axios";

const API_BASE_URL = "http://localhost:3001/api/authentication";

interface LoginData {
  email: string;
  phone_number: string;
  password: string;
}

interface RegisterData {
  email: string;
  phone_number: string;
}

interface ErrorSchema {
  error_code: string;
  error_message: string;
}

interface LoginResponse {
  error_schema: ErrorSchema;
  output_schema: {
    username: string;
    session: string;
  };
}

interface RegisterResponse {
  error_schema: ErrorSchema;
  output_schema: {
    otp: string;
  };
}

interface ValidateOtpResponse {
  error_schema: ErrorSchema;
  output_schema: null;
}

export async function loginService(data: LoginData, callback: (response: LoginResponse) => void) {
  try {
    const response = await axios.post<LoginResponse>(`${API_BASE_URL}/login`, data);
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

export async function registerService(data: RegisterData, callback: (response: RegisterResponse) => void) {
  try {
    const response = await axios.post<RegisterResponse>(`${API_BASE_URL}/register`, data);
    console.log("Register Request:", data);
    console.log("Register Response:", response.data);
    callback(response.data);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    }
    throw new Error("An unexpected error occurred during registration.");
  }
}

export async function validateOtpService(otpConfirm: string, validOtp: string): Promise<ValidateOtpResponse> {
  try {
    const response = await axios.post<ValidateOtpResponse>(`${API_BASE_URL}/validate-otp`, {
      otp_confirm: otpConfirm,
      valid_otp: validOtp,
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    }
    throw new Error("An unexpected error occurred during OTP validation.");
  }
}