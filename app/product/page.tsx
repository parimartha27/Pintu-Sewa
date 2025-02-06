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

const ProductPage = () => {
  return (
    <>
      <Navbar type="product" />
      <div className="flex flex-col px-1 py-2 md:px-6 max-w-[1400px] max-h-auto mx-auto">
        <div className="flex flex-col mt-[60px] w-full">
          <h2 className="text-[24px] font-semibold text-color-primary hidden lg:block mb-3">
            Filter
          </h2>
          <div className="flex w-full">
            <div className="mt-0 shadow-lg rounded-md w-2/5 max-w-[280px] max-h-[1725px] hidden lg:flex flex-col">
              <FilterBody />
            </div>
            <div className="w-full xl:pl-20 flex flex-col">
              <ProductList></ProductList>
            </div>
          </div>
          <div className="flex justify-center xl:ml-80 mt-[50px] lg:mt-[78px] xl:mt-[50px] ">
            {" "}
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    className="text-[14px] text-color-primary"
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    className="text-[14px] text-color-primary"
                  >
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    className="text-[14px] text-color-primary"
                  >
                    3
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    className="text-[14px] text-color-primary"
                  >
                    4
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    className="text-[14px] text-color-primary"
                  >
                    5
                  </PaginationLink>
                </PaginationItem>

                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    className="text-[14px] text-color-primary"
                  >
                    700
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;
