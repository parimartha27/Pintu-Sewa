import AddressForm from "./AddressForm";
import MetodePembayaranLayout from "./MetodePembayaran";
import CheckoutProductForm from "./ProductForm";

const CheckOutBody = () => {
  return (
    <div className="flex flex-col mx-auto w-full max-w-[1280px] min-h-screen h-auto bg-color-layout p-2">
      <div className="flex flex-col">
        <div className="flex flex-col w-full mt-[28px] space-y-4">
          <h2 className="w-full text-xl md:text-2xl font-semibold text-color-primary">
            Pembayaran
          </h2>
          <AddressForm />
        </div>
        <div className="flex flex-col max-h-[1100px] pb-3 pt-0 overflow-y-scroll mt-8">
          <CheckoutProductForm />
          <CheckoutProductForm />
          <CheckoutProductForm />
          <CheckoutProductForm />
        </div>
      </div>
      <div className="mt-8">

        <MetodePembayaranLayout/>
      </div>
    </div>
  );
};

export default CheckOutBody;
