import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full flex-1 p-6 bg-slate-50 dark:bg-slate-900">
        <SidebarTrigger className="mb-4" />
        {children}
      </main>
    </SidebarProvider>
  )
}
