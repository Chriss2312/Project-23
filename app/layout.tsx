import type React from "react"
import type { Metadata } from "next"
import {
  Activity,
  Calendar,
  FileText,
  FingerprintIcon as FingerPrint,
  Home,
  PieChart,
  Settings,
  Users,
} from "lucide-react"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import "./globals.css"

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.dev",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <div className="flex h-screen w-full bg-gray-100 dark:bg-gray-900">
            <Sidebar>
              <SidebarHeader className="flex items-center justify-center py-4">
                <div className="flex items-center space-x-2">
                  <FingerPrint className="h-8 w-8 text-teal-600" />
                  <h1 className="text-xl font-bold">WeStack</h1>
                </div>
              </SidebarHeader>
              <SidebarSeparator />
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel>Main</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <a href="/">
                            <Home />
                            <span>Dashboard</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <a href="/students">
                            <Users />
                            <span>Students</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <a href="/classes">
                            <Calendar />
                            <span>Classes</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <a href="/todays-classes">
                            <Activity />
                            <span>Today's Classes</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <a href="/scanner">
                            <FingerPrint />
                            <span>Scanner</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
                <SidebarSeparator />
                <SidebarGroup>
                  <SidebarGroupLabel>Reports</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <a href="/analytics">
                            <PieChart />
                            <span>Analytics</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
              <SidebarFooter>
                
              </SidebarFooter>
            </Sidebar>

            <div className="flex-1 flex flex-col overflow-hidden">{children}</div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  )
}
