export default function CheckoutLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <div className="h-10 w-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
        <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground animate-pulse">
          Preparing your checkout...
        </p>
      </div>
    </div>
  )
}
