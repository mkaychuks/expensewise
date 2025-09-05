import { defineStore } from "pinia";
import type { Income } from "~/types/income";

export const useIncomeStore = defineStore("income", () => {
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  // the vuefire composables
  const db = useFirestore();

  const addIncome = async (income: Income, currentUser: string) => {
    console.log({...income, currentUser: currentUser});
  };

  return { loading, error, addIncome };
});
