"use client";

import { useState, useEffect } from "react";
import { ProductCardProps } from "@/types/productCard";
import {
  fetchMostRentedProducts,
  fetchNearCustomerProducts,
  fetchRecommendedProducts,
} from "@/services/productService";

export function useMostRentedProducts() {
  const [products, setProducts] = useState<ProductCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await fetchMostRentedProducts();
        if (response.error_schema.error_message === "SUCCESS") {
          setProducts(response.output_schema);
        } else {
          setError(response.error_schema.error_message);
        }
      } catch (err) {
        setError(`Failed to fetch most rented products: ${err}`);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { products, loading, error };
}

export function useNearbyProducts(customerId: string | null) {
  const [products, setProducts] = useState<ProductCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!customerId) {
      setLoading(false);
      return;
    }

    const loadData = async () => {
      try {
        setLoading(true);
        const response = await fetchNearCustomerProducts(customerId);
        if (response.error_schema.error_message === "SUCCESS") {
          setProducts(response.output_schema);
        } else {
          setError(response.error_schema.error_message);
        }
      } catch (err) {
        setError(`Failed to fetch nearby products: ${err}`);
      } finally {
          setLoading(false);
      }
    };

    loadData();
  }, [customerId]);

  return { products, loading, error };
}

export function useRecommendedProducts() {
  const [products, setProducts] = useState<ProductCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await fetchRecommendedProducts();
        if (response.error_schema.error_message === "SUCCESS") {
          setProducts(response.output_schema);
        } else {
          setError(response.error_schema.error_message);
        }
      } catch (err) {
        setError(`Failed to fetch recommended products: ${err}`);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { products, loading, error };
}