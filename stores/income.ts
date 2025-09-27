import {
  addDoc,
  collection,
  orderBy,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { defineStore } from "pinia";
import type {
  Income,
  IncomeResponse,
  TransactionResponse,
} from "~/types/income";

export const useIncomeStore = defineStore("income", () => {
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const db = useFirestore(); // the vuefire composables
  const currentUser = useCurrentUser();

  // fetch the income from firestore
  const incomes = useCollection<IncomeResponse[]>(() => {
    if (!currentUser.value) return null;
    return query(
      collection(db, "income"),
      where("userId", "==", currentUser.value.uid),
      orderBy("dateCreated", "desc")
    );
  });

  // update the income to follow a particular format
  const incomesData = computed<IncomeResponse[]>(() => {
    if (!incomes.value) return [];
    const order: (keyof IncomeResponse)[] = [
      "date",
      "category",
      "amount",
      "description",
    ];
    // @ts-ignore
    return incomes.value.map(({ userId, ...rest }) => {
      // rebuild object in the defined order
      const ordered = order.reduce((obj, key) => {
        // @ts-ignore
        obj[key] = rest[key];
        return obj;
      }, {} as IncomeResponse);
      return ordered;
    });
  });

  // fetch the total income of a user
  const totalIncome = computed(() => {
    if (!incomesData.value) return 0;

    return incomesData.value.reduce((sum, income) => {
      return sum + income.amount;
    }, 0);
  });

  // fetch the user balance
  const balance = computed(() => {
    const leftToSpend = Number(totalIncome.value) - Number(totalExpense.value);
    return leftToSpend;
  });

  // adding income to the firestore database
  const addIncome = async (income: Income, currentUser: string) => {
    loading.value = true;
    try {
      await addDoc(collection(db, "income"), {
        ...income,
        dateCreated: Timestamp.now(),
        userId: currentUser,
      });
      addDoc(collection(db, "recentTransaction"), {
        ...income,
        userId: currentUser,
        dateCreated: Timestamp.now(),
        transaction_Type: "income",
      });
      loading.value = false;
      error.value = null;
    } catch (err) {
      loading.value = false;
      error.value = (err as Error).message;
    } finally {
      loading.value = false;
    }
  };

  // adding income to the firestore database
  const addExpense = async (expense: Income, currentUser: string) => {
    loading.value = true;

    // Check balance before adding
    if (Number(expense.amount) > Number(balance.value)) {
      error.value = "Not enough balance. Expenses exceeded.";
      loading.value = false;
      return;
    }

    try {
      await addDoc(collection(db, "expense"), {
        ...expense,
        dateCreated: Timestamp.now(),
        userId: currentUser,
      });
      addDoc(collection(db, "recentTransaction"), {
        ...expense,
        userId: currentUser,
        dateCreated: Timestamp.now(),
        transaction_Type: "expense",
      });
      error.value = null;
    } catch (err) {
      error.value = (err as Error).message;
    } finally {
      loading.value = false;
    }
  };

  // fetch the income from firestore
  const expenses = useCollection<IncomeResponse[]>(() => {
    if (!currentUser.value) return null;
    return query(
      collection(db, "expense"),
      where("userId", "==", currentUser.value.uid),
      orderBy("dateCreated", "desc")
    );
  });

  // update the income to follow a particular format
  const expensesData = computed<IncomeResponse[]>(() => {
    if (!expenses.value) return [];
    const order: (keyof IncomeResponse)[] = [
      "date",
      "category",
      "amount",
      "description",
    ];
    // @ts-ignore
    return expenses.value.map(({ userId, ...rest }) => {
      // rebuild object in the defined order
      const ordered = order.reduce((obj, key) => {
        // @ts-ignore
        obj[key] = rest[key];
        return obj;
      }, {} as IncomeResponse);
      return ordered;
    });
  });

  // total expenses
  const totalExpense = computed(() => {
    if (!expensesData.value) return 0;

    return expensesData.value.reduce((sum, expense) => {
      return sum + expense.amount;
    }, 0);
  });

  // fetch the recent transactions from firestore
  const recentTransation = useCollection<TransactionResponse[]>(() => {
    if (!currentUser.value) return null;
    return query(
      collection(db, "recentTransaction"),
      where("userId", "==", currentUser.value.uid),
      orderBy("dateCreated", "desc")
    );
  });

  const recentTransactionData = computed<TransactionResponse[]>(() => {
    if (!recentTransation.value) return [];
    const order: (keyof TransactionResponse)[] = [
      "date",
      "category",
      "amount",
      "description",
      "transaction_Type",
    ];
    // @ts-ignore
    return recentTransation.value.map(({ userId, ...rest }) => {
      // rebuild object in the defined order
      const ordered = order.reduce((obj, key) => {
        // @ts-ignore
        obj[key] = rest[key];
        return obj;
      }, {} as TransactionResponse);
      return ordered;
    });
  });

  // the percentage of expenses with regards to the income
  const percentageChange = computed(() => {
    if (totalExpense.value == 0) {
      return 0;
    } else {
      let percentage = (totalExpense.value / totalIncome.value) * 100;
      return percentage.toFixed(2);
    }
  });

  // const generate AI summary for income
  const summary = ref<string | undefined>("");
  const toast = useToast();
  const summaryLoading = ref<boolean>(false);
  const generateAISummary = async (transaction: string, data: any[]) => {
    summaryLoading.value = true;
    const prompt = `Here is a list of ${transaction}:${data
      .map(
        (e) => `- NGN${e.amount} on ${e.category} (${e.date}): ${e.description}`
      )
      .join("\n")}Please write a summary highlighting how the user is ${
      transaction == "income" ? "making" : "spending"
    } money. Mention major categories or patterns if possible.`;
    try {
      const response = await $fetch("/api/chat", {
        body: { prompt },
        method: "POST",
      });
      summary.value = response?.reply;
      summaryLoading.value = false;
    } catch (error) {
      summaryLoading.value = false;
      toast.add({
        title: "Error",
        description: "Failed to generate summary.",
        color: "error",
      });
    }
  };

  return {
    summary,
    summaryLoading,
    generateAISummary,
    percentageChange,
    loading,
    error,
    addIncome,
    incomes,
    incomesData,
    totalIncome,
    addExpense,
    expenses,
    recentTransation,
    expensesData,
    totalExpense,
    balance,
    recentTransactionData,
  };
});
