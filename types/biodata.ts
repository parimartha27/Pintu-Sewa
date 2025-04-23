import { ErrorSchema } from "./errorSchema"
import { ProfileResponse } from "./profile"

export interface BiodataResponseProps{
    error_schema: ErrorSchema
    output_schema: ProfileResponse
}

