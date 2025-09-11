import { addDoc, collection, query, where } from "firebase/firestore";
import { defineStore } from "pinia";
import type { Income, IncomeResponse } from "~/types/income";

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
      where("userId", "==", currentUser.value.uid)
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

    return incomesData.value
      .reduce((sum, income) => {
        return sum + income.amount;
      }, 0)
      .toLocaleString();
  });

  // adding income to the firestore database
  const addIncome = async (income: Income, currentUser: string) => {
    loading.value = true;
    try {
      await addDoc(collection(db, "income"), {
        ...income,
        userId: currentUser,
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
  const addExpense = async (income: Income, currentUser: string) => {
    loading.value = true;
    try {
      await addDoc(collection(db, "expense"), {
        ...income,
        userId: currentUser,
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

  // fetch the income from firestore
  const expenses = useCollection<IncomeResponse[]>(() => {
    if (!currentUser.value) return null;
    return query(
      collection(db, "expense"),
      where("userId", "==", currentUser.value.uid)
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

    return expensesData.value
      .reduce((sum, expense) => {
        return sum + expense.amount;
      }, 0)
      .toLocaleString();
  });

  return {
    loading,
    error,
    addIncome,
    incomes,
    incomesData,
    totalIncome,
    addExpense,
    expenses,
    expensesData,
    totalExpense,
  };
});
