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

interface LoginGoogleResponse {
  username: string;
  email: string;
  profilePicture: string;
}

export async function sendOauthData(userData: LoginGoogleResponse): Promise<void> {
  try {
    await axios.post("https://your-backend.com/api/save-user", userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("User data successfully sent to backend");
  } catch (error) {
    console.error("Error saving user data:", error);
  }
}

export async function loginService(data: LoginData, callback: (response: LoginResponse) => void) {
  try {
    const response = await axios.post<LoginResponse>(`${API_BASE_URL}/login`, data);
    console.log("Login Request:", data);
    console.log("Login Response:", response.data);
    localStorage.setItem("username",response.data.output_schema.username);
    localStorage.setItem("session",response.data.output_schema.session);
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
    localStorage.setItem("otp",response.data.output_schema.otp);
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