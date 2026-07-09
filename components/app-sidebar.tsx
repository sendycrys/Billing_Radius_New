import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Home, Users, Package, Wifi, Receipt, FileText, Settings } from "lucide-react"
import Link from "next/link"

const items = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Customers", url: "/dashboard/customers", icon: Users },
  { title: "Packages", url: "/dashboard/packages", icon: Package },
  { title: "Radius Users", url: "/dashboard/radius", icon: Wifi },
  { title: "Invoices", url: "/dashboard/invoices", icon: Receipt },
  { title: "Tickets", url: "/dashboard/tickets", icon: FileText },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Billing ISP RADIUS</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {/* @ts-expect-error asChild is missing from types but works with Radix Slot */}
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
