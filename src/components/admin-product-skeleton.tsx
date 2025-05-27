import AdminLayout from "./admin-layout";
import { Card, CardContent, CardHeader } from "./ui/card";

export function ProductSkeleton() {
    return (
        <AdminLayout>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="h-8 w-48 bg-muted rounded animate-pulse mb-2"></div>
                    <div className="h-4 w-64 bg-muted rounded animate-pulse"></div>
                </div>
                <div className="h-10 w-32 bg-muted rounded animate-pulse"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                    <Card key={index} className="overflow-hidden">
                        <div className="aspect-square bg-muted animate-pulse"></div>
                        <CardHeader className="pb-3">
                            <div className="h-6 w-3/4 bg-muted rounded animate-pulse mb-2"></div>
                            <div className="flex items-center justify-between">
                                <div className="h-5 w-24 bg-muted rounded animate-pulse"></div>
                                <div className="h-6 w-20 bg-muted rounded animate-pulse"></div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <div className="h-9 w-9 bg-muted rounded animate-pulse"></div>
                                    <div className="h-9 w-9 bg-muted rounded animate-pulse"></div>
                                    <div className="h-9 w-9 bg-muted rounded animate-pulse"></div>
                                </div>
                                <div className="h-4 w-24 bg-muted rounded animate-pulse"></div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </AdminLayout>
    )
}