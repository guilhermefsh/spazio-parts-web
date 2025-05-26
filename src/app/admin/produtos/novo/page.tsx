import AdminLayout from "@/components/admin-layout"
import ProductForm from "@/components/product-form"

export default function NewProductPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Novo Produto</h1>
          <p className="text-muted-foreground">Adicione um novo produto ao catálogo</p>
        </div>

        <ProductForm />
      </div>
    </AdminLayout>
  )
}
