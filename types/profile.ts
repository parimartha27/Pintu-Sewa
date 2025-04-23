export interface ProfileResponse {
  id: string;
  username: string;
  name: string;
  street: string;
  phone_number: string;
  email: string;
  district: string;
  regency: string;
  province: string;
  gender: string;
  birth_date: string;
  post_code: string;
  notes?: string;
  image: string;
}