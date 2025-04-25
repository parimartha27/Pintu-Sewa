import { ErrorSchema } from "./errorSchema"

export interface EditAddressRequestProps{
    id: string,
    street: string,
    district: string,
    regency: string,
    province: string,
    post_code: string,
    notes: string
}

export interface EditAddressResponseProps{
    error_schema: ErrorSchema,
    output_schema: string
}