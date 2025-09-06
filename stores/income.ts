import { addDoc, collection } from "firebase/firestore";
import { defineStore } from "pinia";
import type { Income } from "~/types/income";

export const useIncomeStore = defineStore("income", () => {
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const db = useFirestore(); // the vuefire composables

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

  return { loading, error, addIncome };
});
