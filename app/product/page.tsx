import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import FilterBody from "@/components/fragments/filter/Body";
import ProductList from "@/components/layout/ProductList";

const ProductPage = () => {
  return (
    <>
      <Navbar type="product"/>
      <div className="flex flex-col px-1 py-2 md:px-6 max-w-[1400px] max-h-auto mx-auto">
        <div className="flex flex-col mt-[60px] w-full">
            <h2 className="text-[24px] font-semibold text-color-primary hidden lg:block mb-3">Filter</h2>
            <div className="flex w-full">
                <div className="mt-0 shadow-lg w-2/5 max-w-[280px] max-h-[1725px] hidden lg:flex flex-col">
                  <FilterBody/>
                </div>
                <div className="w-full xl:pl-20"><ProductList></ProductList></div>
            </div>
            <div className="mx-auto mt-[39px] lg:mt-[78px] xl:mt-[39px]"> PAGINATION </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default ProductPage;
