// ===== INI HALAMAN PRODUCT DETAIL ======
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import ProductDetailBody from "@/components/layout/productDetail/Body";

const Products = [{
  name: "IPHONE1"
},
{
  name: "IPHONE2"
},
{
  name: "IPHONE3"
},
{
  name: "IPHONE4"
},
{
  name: "IPHONE5"
},]

const ProductDetail = () => {
  return (
    <>
      <Navbar type="product"/>
        <ProductDetailBody products={Products}/>
      <Footer />
    </>
  );
};

export default ProductDetail;
