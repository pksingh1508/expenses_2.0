import { Alert } from "react-native";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useSessionStore } from "@/store/sessionStore";

const useWallet = () => {
  const [loading, setLoading] = useState(false);
  const [wallet, setWallet] = useState<any>(null);
  const { user_id } = useSessionStore();
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  const calculateAmount = (data: any) => {
    const n = data.length;
    let amount: number = 0;
    let income: number = 0;
    let expense: number = 0;
    for (let i = 0; i < n; i++) {
      amount = amount + data[i].total_amount;
      income = income + data[i].income;
      expense = expense + data[i].expense;
    }
    setTotalAmount(amount);
    setTotalIncome(income);
    setTotalExpense(expense);
  };

  useEffect(() => {
    async function getAllWallet() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("wallets")
          .select("*")
          .eq("user_id", user_id);
        if (error) {
          Alert.alert("Supabase error.");
          return;
        }
        if (data) {
          setWallet(data);
          calculateAmount(data);
        }
      } catch (err) {
        Alert.alert("Error while fetching wallet data");
      } finally {
        setLoading(false);
      }
    }
    getAllWallet();
  }, []);

  return { loading, wallet, totalAmount, totalIncome, totalExpense };
};

export default useWallet;
