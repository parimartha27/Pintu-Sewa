"use client"

import ProductList from "../ProductList";
import Category from "./Category";
import { ProductType } from "@/types/product";
import { useEffect, useState } from 'react';
import axios from "axios";

const baseUrl = "https://pintu-sewa.up.railway.app/api/product";

interface ErrorSchema {
  error_code: string;
  error_message: string;
}

interface ResponseSchema {
  error_schema: ErrorSchema;
  output_schema: {
    content: ProductType[];
  };
}

const fetchMostRentedProducts = async (): Promise<ResponseSchema> => {
  try {
    const response = await axios.get(`${baseUrl}/most-rented`);
    return response.data;
  } catch (error) {
    console.error('Error fetching most rented products:', error);
    throw error;
  }
};

const fetchNearCustomerProducts = async (): Promise<ResponseSchema> => {
  try {
    const response = await axios.get(`${baseUrl}/near-customer`);
    return response.data;
  } catch (error) {
    console.error('Error fetching near customer products:', error);
    throw error;
  }
};

const DashboardBody = () => {
  const [mostRentedProducts, setMostRentedProducts] = useState<ProductType[]>([]);
  const [nearCustomerProducts, setNearCustomerProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const mostRented = await fetchMostRentedProducts();
        setMostRentedProducts(mostRented.output_schema.content);

        const nearCustomer = await fetchNearCustomerProducts();
        setNearCustomerProducts(nearCustomer.output_schema.content);
      } catch (err) {
        setError('Failed to fetch data' + err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  return (
    <div className="flex flex-col px-1 py-2 md:px-6 max-w-[1280px] mx-auto bg-color-layout pb-12 md:pb-[273px]">
      <Category />
      <div>
        <h4 className="font-semibold text-start md:text-center xl:text-start ml-1 text-color-primary text-[20px] md:text-[24px] mt-7 md:mt-0 mb-4">
          Banyak orang menyewa ini
        </h4>
        {error && <div>{error}</div>}
        <ProductList products={mostRentedProducts} loading={loading} />
      </div>

      <div className="mt-5 md:mt-20 lg:mt-32">
        <h4 className="font-semibold text-start md:text-center xl:text-start ml-1 text-color-primary text-[20px] md:text-[24px] mt-7 md:mt-0 lg:-mt-4  mb-4">
          Dekat lokasi kamu
        </h4>
        {error && <div>{error}</div>}
        <ProductList products={nearCustomerProducts} loading={loading} />
      </div>
    </div>
  );
};

export default DashboardBody;
