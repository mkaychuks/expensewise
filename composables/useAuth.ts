import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useFirebaseAuth } from "vuefire";

export const useAuth = () => {
  const auth = useFirebaseAuth();
  const loading = ref(false);
  const error = ref<string | null>(null);
  // the register function
  const register = async (email: string, password: string) => {
    loading.value = true;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth!,
        email,
        password
      );
      loading.value = false;
      return userCredential.user;
    } catch (err) {
      loading.value = false;
      error.value = (err as Error).message;
    } finally {
      loading.value = false;
    }
  };

  // const login
  const loginUser = async (email: string, password: string) => {
    loading.value = true;
    try {
      await signInWithEmailAndPassword(auth!, email, password);
      loading.value = false;
    } catch (err) {
      loading.value = false;
      error.value = (err as Error).message;
    } finally {
      loading.value = false;
    }
  };

  // const signout/logout
  const logOut = async () => {
    await signOut(auth!);
  };

  return { register, loginUser, logOut, loading, error };
};
