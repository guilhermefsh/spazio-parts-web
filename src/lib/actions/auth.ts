"use server"

import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { loginSchema } from "@/lib/validations"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"

export async function loginAction(formData: FormData) {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
        const validatedFields = loginSchema.parse({ email, password })
        const userCredential = await signInWithEmailAndPassword(auth, validatedFields.email, validatedFields.password)

        if (userCredential.user) {
            const idToken = await userCredential.user.getIdToken()
            const cookieStore = await cookies()
            cookieStore.set("session", idToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 60 * 60 * 24 * 7, // 1 week
            })

            revalidatePath("/admin")
            redirect("/admin")
        }
    } catch (error) {
        if (error instanceof Error) {
            return { error: error.message }
        }
        return { error: "Erro ao fazer login" }
    }
}

export async function logoutAction() {
    const cookieStore = await cookies()
    cookieStore.delete("session")
    revalidatePath("/admin")
    redirect("/admin/login")
} 