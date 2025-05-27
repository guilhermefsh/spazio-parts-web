import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore"
import { FirebaseError } from "firebase/app"
import { db } from "./firebase"
import type { Product } from "./types"

const PRODUCTS_COLLECTION = "parts"

export const createProduct = async (productData: Omit<Product, "id" | "createdAt" | "updatedAt">) => {
  try {
    const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), {
      ...productData,
      created: Timestamp.now(),
      updated: Timestamp.now(),
    })
    return { id: docRef.id, error: null }
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      return { id: null, error: error.message }
    }
    return { id: null, error: 'An unknown error occurred' }
  }
}

export const updateProduct = async (id: string, productData: Partial<Product>) => {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, id)
    await updateDoc(docRef, {
      ...productData,
      updated: Timestamp.now(),
    })
    return { error: null }
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      return { error: error.message }
    }
    return { error: 'An unknown error occurred' }
  }
}

export const deleteProduct = async (id: string) => {
  try {
    await deleteDoc(doc(db, PRODUCTS_COLLECTION, id))
    return { error: null }
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      return { error: error.message }
    }
    return { error: 'An unknown error occurred' }
  }
}

export const getProducts = async (): Promise<Product[]> => {
  try {
    const q = query(collection(db, PRODUCTS_COLLECTION), orderBy("created", "desc"))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().created?.toDate() || new Date(),
      updatedAt: doc.data().updated?.toDate() || new Date(),
    })) as Product[]
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
}

export const getProduct = async (id: string): Promise<Product | null> => {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
        createdAt: docSnap.data().created?.toDate() || new Date(),
        updatedAt: docSnap.data().updated?.toDate() || new Date(),
      } as Product
    }
    return null
  } catch (error) {
    console.error("Error fetching product:", error)
    return null
  }
}
