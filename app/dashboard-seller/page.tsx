"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Filter, ShoppingCart, Star } from "lucide-react";
import {
  fetchShopDashboard,
  fetchWalletHistory,
} from "@/services/dashboardService";
import { formatCurrency } from "@/lib/utils";
import { useRouter } from "next/navigation"
import axios, { Axios } from "axios";
import { useAuth } from "@/hooks/auth/useAuth"
import SellerLayout from "@/components/layout/dashboard-seller/Layout";
import { StatsCard } from "@/components/fragments/dashboard-seller/StatsCard";
import { TransactionsTable } from "@/components/fragments/dashboard-seller/TransactionTable";
import { WalletTransactionsList } from "@/components/fragments/dashboard-seller/WalletTransactionList";
import Alert from "@/components/layout/Alert";
import { AlertProps } from "@/types/alert";
import { shopBaseUrl } from "@/types/globalVar";

interface ShopDashboard {
  wallet: number;
  average_rating: number;
  shop_status: string;
  wallet_report: unknown[];
  transaction_count: number;
  transaction_list: Array<{
    refference_no: string;
    create_at: string;
    customer_name: string;
    start_date: string;
    end_date: string;
    duration: number;
    status: string;
    deposit_status: boolean;
  }>;
}

interface WalletTransaction {
  id: string;
  description: string;
  tanggal_transaksi: string;
  waktu_transaksi: string;
  amount: number;
  debit: boolean;
}

const WalletSeller = () => {
    const { customerId } = useAuth()

  const router = useRouter()
  const [dashboardData, setDashboardData] = useState<ShopDashboard | null>(
    null
  );
  const [walletHistory, setWalletHistory] = useState<WalletTransaction[]>([]);
  const [shopId, setShopId] = useState<String | null>(
    typeof window !== "undefined" ? localStorage.getItem("shopId") : null
  );
  const [loading, setLoading] = useState({
    dashboard: true,
    wallet: true,
  });
  const [error, setError] = useState<string | null>(null);
  const [alertState, setAlertState] = useState<AlertProps>({
    isOpen: false,
    message: "",
    isWrong: true,
  });

  const fetchShopId = async () => {
    try {
      const response = await axios.get(`${shopBaseUrl}/get-shop/${customerId}`);
      if (response.data.error_schema.error_code === "PS-00-000") {
        localStorage.setItem("shopId", response.data.output_schema);
        setShopId(response.data.output_schema);
      }else if (response.data.error_schema.error_code === "PS-00-002"){
        router.push("/create-shop")
      }
    } catch (err: any) {
      console.log("ini errornya bro", err);
    }
  };

  const loadData = async () => {
    try {
      const getShopToken = localStorage.getItem("shopId");

      if (!getShopToken) throw new Error("Shop ID tidak ditemukan");
      const [dashboard, wallet] = await Promise.all([
        fetchShopDashboard(getShopToken),
        fetchWalletHistory(getShopToken),
      ]);

      setDashboardData(dashboard);
      setWalletHistory(wallet);
      setLoading({ dashboard: false, wallet: false });

    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch data");
      setLoading({ dashboard: false, wallet: false });
      setAlertState({
        isOpen: true,
        message: err instanceof Error ? err.message : "Failed to fetch data",
      });
    }
  };

  useEffect(() => {
    if (!shopId) {
      fetchShopId();
    }else{
      loadData();
    }
  }, [shopId]);

  if (error) {
    return (
      <SellerLayout>
        <div className="p-4 text-red-500">{error}</div>
      </SellerLayout>
    );
  }

  return (
    <SellerLayout>
      {alertState.isOpen && (
        <Alert
          message={alertState.message}
          isOpen={alertState.isOpen}
          onClose={() => setAlertState({ isOpen: false, message: "" })}
          isWrong={alertState.isWrong}
        />
      )}

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <StatsCard
          title="Saldo Wallet"
          value={dashboardData ? formatCurrency(dashboardData.wallet) : "Rp 0"}
          loading={loading.dashboard}
        />

        <StatsCard
          title="Rating Toko"
          value={dashboardData?.average_rating.toFixed(1) || "0.0"}
          icon={<Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />}
          loading={loading.dashboard}
        />

        <StatsCard
          title="Jumlah Transaksi"
          value={dashboardData?.transaction_count || 0}
          icon={<ShoppingCart className="h-5 w-5 text-blue-500" />}
          loading={loading.dashboard}
        />

        <StatsCard
          title="Status Toko"
          value={
            <div className="flex items-center gap-1">
              <span
                className={`text-xs px-4 py-2 rounded ${
                  dashboardData?.shop_status === "ACTIVE"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {dashboardData?.shop_status || "Inactive"}
              </span>
            </div>
          }
          loading={loading.dashboard}
        />
      </div>

      {/* Current Transactions */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Transaksi Berlangsung</h2>
          {/* <Button variant="outline" size="sm" className="gap-1">
            <Filter className="h-4 w-4" />
            Filter
          </Button> */}
        </div>

        <div className="bg-white rounded-md shadow overflow-hidden">
          <TransactionsTable
            transactions={dashboardData?.transaction_list || []}
            loading={loading.dashboard}
          />
        </div>
      </div>

      {/* Transaction History */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Riwayat Wallet</h2>
          {/* <Button variant="outline" size="sm" className="gap-1">
            <Filter className="h-4 w-4" />
            Filter
          </Button> */}
        </div>

        <div className="bg-white rounded-md shadow overflow-hidden">
          <WalletTransactionsList
            transactions={walletHistory}
            loading={loading.wallet}
          />
        </div>
      </div>
    </SellerLayout>
  );
};

export default WalletSeller;
