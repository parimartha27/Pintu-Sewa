import Footer from "@/components/layout/Footer";
import MainLayout from "@/components/layout/MainLayout";
import Navbar from "@/components/layout/Navbar";

const ProductPage = () => {
  return (
    <>
      <Navbar type="product"/>
      <MainLayout>
        <div className="flex flex-col">
            <div className="flex space-x-[24px]">
                <div>FILTER</div>
                <div>SEARCh RESULT</div>
            </div>
            <div className="mx-auto"> PAGINATION </div>
        </div>
      </MainLayout>
      <Footer/>
    </>
  );
};

export default ProductPage;
