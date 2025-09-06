import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, collection } from "firebase/firestore";
import { useFirebaseAuth } from "vuefire";

export const useAuth = () => {
  const auth = useFirebaseAuth(); // the auth function from vuefire
  const db = useFirestore(); // the firestore function from vuefire
  const loading = ref(false);
  const error = ref<string | null>(null);

  // the register function
  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    loading.value = true;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth!,
        email,
        password
      );
      const user = userCredential.user;
      await updateProfile(user, { displayName: username });
      if (user) {
        setDoc(doc(db, "users", userCredential.user.uid), {
          username,
          email,
          createdAt: new Date().toISOString(),
        });
      }
      loading.value = false;
      error.value = null;
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
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth!,
        email,
        password
      );

      loading.value = false;
      error.value = null;
      return userCredential;
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

  //request reset password
  const passwordResetEmail = async (email: string) => {
    loading.value = true;
    try {
      await sendPasswordResetEmail(auth!, email);
      loading.value = false;
    } catch (err) {
      loading.value = false;
      error.value = (err as Error).message;
    } finally {
      loading.value = false;
    }
  };

  return { register, loginUser, logOut, loading, error, passwordResetEmail };
};
