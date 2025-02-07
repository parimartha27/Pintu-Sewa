import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import FilterBody from "@/components/fragments/filter/Body";
import ProductList from "@/components/layout/ProductList";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import ProductBody from "@/components/layout/product/Body";

const Products = [
  {
    name: "sepatu",
  },
  {
    name: "sepatu",
  },
  {
    name: "sepatu",
  },
  {
    name: "sepatu",
  },
  {
    name: "sepatu",
  },
  {
    name: "sepatu",
  },
  {
    name: "sepatu",
  },
  {
    name: "sepatu",
  },
  {
    name: "sepatu",
  },
  {
    name: "sepatu",
  },
  {
    name: "sepatu",
  },
  {
    name: "sepatu",
  },
  {
    name: "sepatu",
  },
  {
    name: "sepatu",
  },
  {
    name: "sepatu",
  },
  {
    name: "sepatu",
  },
];

const ProductPage = () => {
  return (
    <>
      <Navbar type="product" />
        <ProductBody products={Products}/>
      <Footer />
    </>
  );
};

export default ProductPage;
