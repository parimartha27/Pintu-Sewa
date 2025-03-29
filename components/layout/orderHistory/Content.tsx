import OrderHistoryContentBody from "./ContentBody";
import OrderHistoryContentHeader from "./ContentHeader";

const OrderHistoryContent = () => {return (
    <div className="w-full flex flex-col px-4 lg:px-0 mb-52">
        <OrderHistoryContentHeader/>
        <OrderHistoryContentBody/>
    </div>
)}


export default OrderHistoryContent;