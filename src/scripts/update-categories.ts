import { db } from "@/lib/firebase"
import { collection, getDocs, updateDoc } from "firebase/firestore"
import { categories } from "@/lib/types"

const PRODUCTS_COLLECTION = "parts"

async function updateProductCategories() {
    try {
        const querySnapshot = await getDocs(collection(db, PRODUCTS_COLLECTION))

        const updatePromises = querySnapshot.docs.map(async (doc) => {
            const productData = doc.data()

            if (!productData.category) {
                const defaultCategory = categories[0].slug

                await updateDoc(doc.ref, {
                    category: defaultCategory,
                    updated: new Date()
                })

                console.log(`Updated product ${doc.id} with category: ${defaultCategory}`)
            }
        })

        await Promise.all(updatePromises)
        console.log("All products have been updated with categories!")

    } catch (error) {
        console.error("Error updating products:", error)
    }
}

updateProductCategories() 