import {
  Activity,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  FingerprintIcon as FingerPrint,
  Home,
  PieChart,
  Settings,
  Users,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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

export default function AdminDashboard() {
  return (
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
                    <SidebarMenuButton asChild isActive>
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
                        <span>Live Attendance</span>
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
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/reports">
                        <FileText />
                        <span>Export Reports</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/settings">
                    <Settings />
                    <span>Settings</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white dark:bg-gray-800 shadow-sm">
            <div className="px-6 py-4 flex items-center justify-between">
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <div className="flex items-center space-x-4">
                <Button variant="outline" asChild>
                  <a href="/todays-classes">
                    <Clock className="mr-2 h-4 w-4" />
                    Today's Classes
                  </a>
                </Button>
                <Button asChild>
                  <a href="/scanner">
                    <FingerPrint className="mr-2 h-4 w-4" />
                    Scanner Status
                  </a>
                </Button>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Students</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">1,248</div>
                  <p className="text-xs text-muted-foreground mt-1">+12 new this week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Today's Attendance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">87%</div>
                  <p className="text-xs text-green-500 mt-1">+2% from yesterday</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Low Attendance Alert</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-orange-500">42</div>
                  <p className="text-xs text-muted-foreground mt-1">Students below 75%</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Live Attendance Feed</CardTitle>
                  <CardDescription>Real-time fingerprint scan data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <LiveAttendanceFeed />
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Attendance by Department</CardTitle>
                  <CardDescription>Weekly average attendance rate</CardDescription>
                </CardHeader>
                <CardContent>
                  <AttendanceByDepartment />
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Attendance Records</CardTitle>
                <CardDescription>Latest fingerprint scans from all departments</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentAttendanceTable />
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

function LiveAttendanceFeed() {
  const attendanceEvents = [
    { id: 1, name: "John Smith", time: "Just now", status: "Present", course: "Computer Science" },
    { id: 2, name: "Emily Johnson", time: "2 mins ago", status: "Present", course: "Electrical Engineering" },
    { id: 3, name: "Michael Brown", time: "5 mins ago", status: "Present", course: "Mechanical Engineering" },
    { id: 4, name: "Sarah Davis", time: "8 mins ago", status: "Present", course: "Civil Engineering" },
  ]

  return (
    <div className="space-y-4">
      {attendanceEvents.map((event) => (
        <div key={event.id} className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
          <div className="bg-teal-100 dark:bg-teal-900 p-2 rounded-full">
            <FingerPrint className="h-5 w-5 text-teal-600 dark:text-teal-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">{event.name}</p>
            <p className="text-sm text-muted-foreground truncate">{event.course}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-green-600 dark:text-green-400 flex items-center">
              <CheckCircle2 className="h-4 w-4 mr-1" />
              {event.status}
            </p>
            <p className="text-xs text-muted-foreground">{event.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function AttendanceByDepartment() {
  const departments = [
    { name: "Computer Science", attendance: 92 },
    { name: "Electrical Engineering", attendance: 88 },
    { name: "Mechanical Engineering", attendance: 85 },
    { name: "Civil Engineering", attendance: 79 },
    { name: "Business Administration", attendance: 72 },
  ]

  return (
    <div className="space-y-4">
      {departments.map((dept) => (
        <div key={dept.name} className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{dept.name}</span>
            <span className="text-sm font-medium">{dept.attendance}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div className="bg-teal-600 h-2.5 rounded-full" style={{ width: `${dept.attendance}%` }}></div>
          </div>
        </div>
      ))}
    </div>
  )
}

function RecentAttendanceTable() {
  const records = [
    {
      id: 1,
      name: "John Smith",
      studentId: "CS2023001",
      time: "09:15 AM",
      date: "Today",
      subject: "Database Systems",
      status: "Present",
    },
    {
      id: 2,
      name: "Emily Johnson",
      studentId: "EE2023042",
      time: "09:18 AM",
      date: "Today",
      subject: "Circuit Theory",
      status: "Present",
    },
    {
      id: 3,
      name: "Michael Brown",
      studentId: "ME2023105",
      time: "09:22 AM",
      date: "Today",
      subject: "Thermodynamics",
      status: "Present",
    },
    {
      id: 4,
      name: "Sarah Davis",
      studentId: "CE2023078",
      time: "09:25 AM",
      date: "Today",
      subject: "Structural Analysis",
      status: "Present",
    },
    {
      id: 5,
      name: "David Wilson",
      studentId: "CS2023012",
      time: "09:30 AM",
      date: "Today",
      subject: "Database Systems",
      status: "Present",
    },
  ]

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4 font-medium">Student</th>
            <th className="text-left py-3 px-4 font-medium">ID</th>
            <th className="text-left py-3 px-4 font-medium">Subject</th>
            <th className="text-left py-3 px-4 font-medium">Time</th>
            <th className="text-left py-3 px-4 font-medium">Date</th>
            <th className="text-left py-3 px-4 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id} className="border-b">
              <td className="py-3 px-4">{record.name}</td>
              <td className="py-3 px-4">{record.studentId}</td>
              <td className="py-3 px-4">{record.subject}</td>
              <td className="py-3 px-4">{record.time}</td>
              <td className="py-3 px-4">{record.date}</td>
              <td className="py-3 px-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  {record.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
