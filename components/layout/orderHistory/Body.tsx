import ProfileSidebarLayout from "../ProfileSidebar";
import OrderHistoryContent from "./Content";

const OrderHistoryBody = () => {
    return ( <div className="flex flex-col md:flex-row w-full m-1 justify-self-center md:p-0 md:px-6 md:pt-12 max-w-[1400px] max-h-auto space-x-0 md:space-x-8 bg-color-layout">
        <ProfileSidebarLayout/>
        <OrderHistoryContent/>
      </div>);
};

export default OrderHistoryBody;