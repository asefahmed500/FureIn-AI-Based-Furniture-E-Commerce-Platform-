import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { ProfileForm } from "@/components/dashboard/profile-form"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Camera, ShieldCheck } from "lucide-react"

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect("/auth/login")
  }

  const { user } = session

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-1">
        <h1 className="text-4xl font-black tracking-tight">Citizen Profile</h1>
        <p className="text-muted-foreground font-medium uppercase tracking-widest text-[10px]">
          Manage your architectural identity and preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
        {/* Left: Avatar & Identity */}
        <div className="space-y-8">
          <div className="p-8 rounded-2xl bg-secondary/5 border border-border/50 text-center space-y-6">
            <div className="relative mx-auto w-32 h-32">
              <Avatar className="w-full h-full border-4 border-primary/20">
                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} />
                <AvatarFallback>{user.name ? user.name[0] : "U"}</AvatarFallback>
              </Avatar>
              <Button size="icon" className="absolute bottom-0 right-0 h-10 w-10 rounded-full shadow-xl">
                <Camera className="h-5 w-5" />
              </Button>
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-black">{user.name}</h3>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{user.email}</p>
            </div>
            <div className="pt-4 flex flex-wrap justify-center gap-2">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20">
                Verified Citizen
              </span>
              <span className="px-3 py-1 rounded-full bg-secondary text-muted-foreground text-[10px] font-black uppercase tracking-widest border border-border/50">
                Legacy Member
              </span>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-primary text-primary-foreground space-y-4">
            <ShieldCheck className="h-8 w-8 opacity-50" />
            <h4 className="font-black uppercase tracking-widest text-sm">Security Clearance</h4>
            <p className="text-xs font-medium opacity-80 leading-relaxed">
              Two-factor authentication is active. Your architectural data is encrypted with high-grade preservation protocols.
            </p>
          </div>
        </div>

        {/* Right: Form Settings */}
        <div className="xl:col-span-2">
          <ProfileForm user={{ name: user.name || "", email: user.email || "" }} />
        </div>
      </div>
    </div>
  )
}
