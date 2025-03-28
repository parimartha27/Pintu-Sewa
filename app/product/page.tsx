import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
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
