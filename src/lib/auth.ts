import { signInWithEmailAndPassword, signOut as firebaseSignOut, onAuthStateChanged, type User } from "firebase/auth"
import { FirebaseError } from "firebase/app"
import { auth } from "./firebase"

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return { user: userCredential.user, error: null }
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      return { user: null, error: error.message }
    }
    return { user: null, error: 'An unexpected error occurred' }
  }
}

export const signOut = async () => {
  try {
    await firebaseSignOut(auth)
    return { error: null }
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      return { error: error.message }
    }
    return { error: 'An unexpected error occurred' }
  }
}

export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback)
}
