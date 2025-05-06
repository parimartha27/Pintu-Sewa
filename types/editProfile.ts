import { ErrorSchema } from "./errorSchema";

export interface EditProfileRequestProps {
    id: string;
    username: string;
    name: string;
    phone_number: string;
    gender: string;
    birth_date: string;
    image: string;
}

export interface EditProfileResponseProps {
    error_schema: ErrorSchema;
    output_schema: {
      id: string;
      username: string;
      name: string;
      phone_number: string;
      gender: string;
      birth_date: string;
      image: string;
      email: string;
      street: string;
      district: string;
      regency: string;
      province: string;
      post_code: string;
      notes: string;
      status: string | null;
    };
  }