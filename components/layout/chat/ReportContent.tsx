import ContactListCustomer from "./ContactListCustomer";
import NoChat from "@/components/fragments/chat/NoChat";
import { useEffect, useState } from "react";
import axios from "axios";
import { chatBaseUrl } from "@/types/globalVar";
import { useAuth } from "@/hooks/auth/useAuth";
import ReportRoomCustomer from "./ReportRoomCustomer";

const ReportContentLayout = () => {
  const { customerId } = useAuth();
  const [loading, setLoading] = useState(false);
  const [room, setRoom] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${chatBaseUrl}/view-report-roomchat/${customerId}`
        );
        console.log(response);
        setRoom(response.data.output_schema);
      } catch (error) {
        console.error("Failed to fetch report:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-6 min-h-[500px]"></div>;

  return (
    <div className="flex w-full min-h-[500px] mb-36 shadow-md">
      {room ? <ReportRoomCustomer roomId={room} /> : <NoChat />}
    </div>
  );
};

export default ReportContentLayout;
