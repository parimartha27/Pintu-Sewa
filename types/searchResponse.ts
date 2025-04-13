import { ErrorSchema } from "./errorSchema";

export interface SearchResponseProps {
  error_schema: ErrorSchema;
  output_schema: {
    products: {
      id: string;
      name: string;
      category:string;
    }[];
    shops: {
      id: string;
      name: string;
      image:string;
    }[];
  };
}
