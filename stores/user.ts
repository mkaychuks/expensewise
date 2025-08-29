import { defineStore } from "pinia";
import type { IUser } from "~/types/user";

export const useUserStore = defineStore("users", () => {
  // const userDetails = ref<IUser | null>(null);
  // const loading = ref<boolean>(false);
  // const error = ref<string | null>(null);

  // const { loginUser } = useAuth();

  // const login = async (email: string, password: string) => {
  //   loading.value = true;
  //   try {
  //     const user = await loginUser(email, password);
  //     userDetails.value = user;
  //   } catch (err) {
  //     loading.value = false;
  //     error.value = (err as Error).message;
  //   } finally {
  //     loading.value = false;
  //   }
  // };

  // return { userDetails, loading, error, login };
});
