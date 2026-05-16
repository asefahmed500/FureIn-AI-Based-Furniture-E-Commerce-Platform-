import { PasswordForm } from "@/components/dashboard/password-form"
import { Bell, ShieldCheck, Globe, Zap } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-1">
        <h1 className="text-4xl font-black tracking-tight">System Protocols</h1>
        <p className="text-muted-foreground font-medium uppercase tracking-widest text-[10px]">
          Configure your architectural environment and security clearances.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
        {/* Left Sidebar: Preferences */}
        <div className="space-y-8">
          <div className="p-8 rounded-2xl bg-secondary/5 border border-border/50 space-y-8">
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <Bell className="h-4 w-4 text-primary" />
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em]">Transmission</h4>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-muted-foreground">Push Notifications</span>
                  <div className="h-4 w-8 rounded-full bg-primary relative"><div className="absolute right-1 top-1 h-2 w-2 rounded-full bg-white" /></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-muted-foreground">Email Summaries</span>
                  <div className="h-4 w-8 rounded-full bg-zinc-200 relative"><div className="absolute left-1 top-1 h-2 w-2 rounded-full bg-white" /></div>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <Globe className="h-4 w-4 text-primary" />
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em]">Regional</h4>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-muted-foreground">Currency</span>
                  <span className="text-[10px] font-black tracking-widest">USD ($)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-muted-foreground">Language</span>
                  <span className="text-[10px] font-black tracking-widest">ENGLISH</span>
                </div>
              </div>
            </section>

            <section className="space-y-4 pt-4 border-t border-border/50">
              <div className="flex items-center gap-3">
                <Zap className="h-4 w-4 text-primary" />
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em]">Advanced</h4>
              </div>
              <p className="text-[10px] font-medium text-muted-foreground leading-relaxed">
                Beta features and experimental architectural rendering protocols.
              </p>
            </section>
          </div>

          <div className="p-8 rounded-2xl bg-zinc-900 text-white space-y-4">
            <ShieldCheck className="h-8 w-8 text-primary" />
            <h4 className="font-black uppercase tracking-widest text-sm">Privacy Vault</h4>
            <p className="text-xs font-medium opacity-60 leading-relaxed">
              Your architectural data is never shared with third-party conglomerates. We prioritize citizen privacy above all.
            </p>
          </div>
        </div>

        {/* Right: Security Form */}
        <div className="xl:col-span-2">
          <div className="p-8 md:p-12 rounded-3xl bg-white border border-border/50 shadow-sm">
            <PasswordForm />
          </div>
        </div>
      </div>
    </div>
  )
}
