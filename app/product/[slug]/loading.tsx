export default function ProductLoading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-pulse">
        <div className="aspect-square bg-muted rounded-2xl" />
        <div className="space-y-4">
          <div className="h-6 w-3/4 bg-muted rounded" />
          <div className="h-8 w-1/2 bg-muted rounded" />
          <div className="h-4 w-full bg-muted rounded" />
          <div className="h-4 w-full bg-muted rounded" />
          <div className="h-4 w-2/3 bg-muted rounded" />
          <div className="h-12 w-48 bg-muted rounded mt-6" />
        </div>
      </div>
    </div>
  )
}
