"use client";

import ProductList from "../ProductList";
import Category from "./Category";
import { ProductType } from "@/types/product";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { ErrorSchema } from "@/types/errorSchema";

const baseUrl = "https://pintu-sewa.up.railway.app/api/product";

interface ResponseSchema {
  error_schema: ErrorSchema;
  output_schema: ProductType[];
}

const fetchMostRentedProducts = async (): Promise<ResponseSchema> => {
  try {
    const response = await axios.get(`${baseUrl}/most-rented`);
    return response.data;
  } catch (error) {
    console.error("Error fetching most rented products:", error);
    throw error;
  }
};

const fetchNearCustomerProducts = async (
  customerId: string
): Promise<ResponseSchema> => {
  try {
    const response = await axios.get(
      `${baseUrl}/near-customer?customerId=${customerId}`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching near customer products:", error);
    throw error;
  }
};

const fetchRecommendedProducts = async (): Promise<ResponseSchema> => {
  try {
    const response = await axios.get(`${baseUrl}/recommended`);
    return response.data;
  } catch (error) {
    console.error("Error fetching near customer products:", error);
    throw error;
  }
};

const DashboardBody = () => {
  const { data: session } = useSession();

  const [mostRentedProducts, setMostRentedProducts] = useState<ProductType[]>(
    []
  );
  const [nearCustomerProducts, setNearCustomerProducts] = useState<
    ProductType[]
  >([]);
  const [recommendedProducts, setRecommendedProducts] = useState<ProductType[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {

    setCustomerId(localStorage.getItem("customerId"));
    setToken(localStorage.getItem("token"));

    const fetchData = async () => {
      setError("");
      try {
        const [mostRented, recommended, nearCustomer] = await Promise.all([
          fetchMostRentedProducts(),
          fetchRecommendedProducts(),
          fetchNearCustomerProducts(customerId || ""),
        ]);

        setMostRentedProducts(mostRented.output_schema);
        setRecommendedProducts(recommended.output_schema);
        setNearCustomerProducts(nearCustomer.output_schema);

        console.log(mostRented.output_schema);
        
      } catch (err) {
        setError("Failed to fetch data" + err);
      } finally{
        setLoading(false);
      }
    };

    fetchData();
  }, [customerId, token]);

  return (
    <div className="flex flex-col px-1 py-2 md:px-6 max-w-[1280px] mx-auto bg-color-layout pb-12 md:pb-[273px]">
      <Category />
      <div>
        <h4 className="font-semibold text-start md:text-center xl:text-start ml-1 text-color-primary text-[20px] md:text-[24px] mt-7 md:mt-0 mb-4">
          Banyak Orang Menyewa Ini
        </h4>
        {error && <div>{error}</div>}
        {mostRentedProducts && (
          <ProductList products={mostRentedProducts} loading={loading} />
        )}
      </div>

      <div className="mt-5 md:mt-20 lg:mt-32">
        {localStorage.getItem("token") || session ? (
          <>
            <h4 className="font-semibold text-start md:text-center xl:text-start ml-1 text-color-primary text-[20px] md:text-[24px] mt-7 md:mt-0 lg:-mt-4 mb-4">
              Dekat Lokasi Kamu
            </h4>
            {error && <div>{error}</div>}
            <ProductList products={nearCustomerProducts} loading={loading} />
          </>
        ) : (
          <>
            <h4 className="font-semibold text-start md:text-center xl:text-start ml-1 text-color-primary text-[20px] md:text-[24px] mt-7 md:mt-0 lg:-mt-4 mb-4">
              Rekomendasi Untuk Kamu
            </h4>
            {error && <div>{error}</div>}
            <ProductList products={recommendedProducts} loading={loading} />
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardBody;
