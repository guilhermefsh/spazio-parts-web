export default function ProductSkeleton() {
    return (
        <div className="bg-card rounded-lg shadow-sm overflow-hidden animate-pulse">
            <div className="aspect-square bg-muted" />
            <div className="p-4 space-y-3">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-4 bg-muted rounded w-1/2" />
                <div className="h-8 bg-muted rounded w-1/3" />
            </div>
        </div>
    )
} 