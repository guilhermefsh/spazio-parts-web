import { storage } from "@/lib/firebase"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"

export async function uploadImage(file: File) {
    try {
        const timestamp = Date.now()
        const fileName = `${timestamp}_${file.name}`
        const storageRef = ref(storage, `products/${fileName}`)

        const snapshot = await uploadBytes(storageRef, file)
        const url = await getDownloadURL(snapshot.ref)

        return { url }
    } catch (error) {
        console.error("Error uploading image:", error)
        throw new Error("Failed to upload image")
    }
} 