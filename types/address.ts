import { ErrorSchema } from "./errorSchema"

export interface AddressResponseProps{
    error_schema: ErrorSchema
    output_schema: AddressProps
}

export interface AddressProps{
    customer_id: string;
    street: string;
    district: string;
    regency: string;
    province: string;
    post_code: string;
    notes: string | null;
}