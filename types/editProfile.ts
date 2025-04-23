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
    output_schema: string;
}