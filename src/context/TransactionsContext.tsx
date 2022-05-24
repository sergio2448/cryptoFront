import React, { createContext, useState, useEffect } from "react";
import { Transaction, TransactionsResponse } from "../interfaces/appInterfaces";
import walletApi from "../api/walletApi";
import { changecoin } from "../components/ChangeCoin";

type TransactionsContextProps = {
  transactions: Transaction[];
  loadTransactions: (id: number) => Promise<void>;
  loadTransactionById: (id: number) => Promise<Transaction>;
  bitcoin: number | any;
};

export const TransactionsContext = createContext(
  {} as TransactionsContextProps
);

export const TransactionsProvider = ({ children }: any) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const loadTransactions = async (id: number) => {
    const resp = await walletApi.get<TransactionsResponse>(
      `/transactions?user_id=` + id
    );
    setTransactions([...resp.data.map((t: any) => t)]);
  };

  const loadTransactionById = async (id: number) => {
    throw new Error("Not implemented");
  };

  const [pri, setPri] = useState("");

  const api = async () => {
    let price = await walletApi.get("/currentprice");
    let priceApi = price.data.response;
    setPri(priceApi);
  };

  useEffect(() => {
    var time = setInterval(api, 5000);
    return () => {
      clearTimeout(time);
    };
  }, []);

  var bitcoin = !pri ? null : changecoin("usd", pri);

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        loadTransactions,
        loadTransactionById,
        bitcoin,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};
