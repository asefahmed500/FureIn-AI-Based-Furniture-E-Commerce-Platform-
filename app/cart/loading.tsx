export default function CartLoading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="space-y-6 animate-pulse">
        <div className="h-8 w-32 bg-muted rounded" />
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex gap-6">
            <div className="h-24 w-24 bg-muted rounded-xl" />
            <div className="flex-1 space-y-3">
              <div className="h-4 w-3/4 bg-muted rounded" />
              <div className="h-4 w-1/3 bg-muted rounded" />
              <div className="h-4 w-1/4 bg-muted rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
