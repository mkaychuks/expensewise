import { addDoc, collection, query, where } from "firebase/firestore";
import { defineStore } from "pinia";
import type { Income, IncomeResponse } from "~/types/income";

export const useIncomeStore = defineStore("income", () => {
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const db = useFirestore(); // the vuefire composables
  const currentUser = useCurrentUser();

  const incomes = useCollection<IncomeResponse[]>(() => {
    if (!currentUser.value) return null;
    return query(
      collection(db, "income"),
      where("userId", "==", currentUser.value.uid)
    );
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

  return { loading, error, addIncome, incomes };
});
