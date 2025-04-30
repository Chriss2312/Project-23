import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  Calendar,
  Clock,
  FingerprintIcon as FingerPrint,
  MapPin,
  MoreHorizontal,
  Search,
  User,
  Users,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export default function TodaysClassesPage() {
  return (
    <div className="w-full h-full p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Today's Classes</h1>
          <p className="text-muted-foreground">Monday, April 29, 2025</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search classes..." className="w-[250px] pl-8" />
          </div>
          <Button>
            <Calendar className="mr-2 h-4 w-4" />
            View Calendar
          </Button>
        </div>
      </div>

      <Tabs defaultValue="ongoing">
        <TabsList className="mb-6">
          <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="all">All Classes</TabsTrigger>
        </TabsList>

        <TabsContent value="ongoing" className="m-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <OngoingClassCard
              title="Database Systems"
              code="CS401"
              time="09:00 - 10:30"
              location="Room 201, CS Building"
              instructor="Dr. Sarah Johnson"
              attendanceRate={92}
              studentsPresent={42}
              totalStudents={45}
              status="In Progress"
            />
            <OngoingClassCard
              title="Software Engineering"
              code="CS402"
              time="09:30 - 11:00"
              location="Room 305, Engineering Block"
              instructor="Prof. Michael Chen"
              attendanceRate={88}
              studentsPresent={35}
              totalStudents={40}
              status="In Progress"
            />
            <OngoingClassCard
              title="Computer Networks"
              code="CS403"
              time="10:00 - 11:30"
              location="Lab 102, IT Building"
              instructor="Dr. Robert Wilson"
              attendanceRate={85}
              studentsPresent={34}
              totalStudents={40}
              status="In Progress"
            />
          </div>
        </TabsContent>

        <TabsContent value="upcoming" className="m-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <UpcomingClassCard
              title="Operating Systems"
              code="CS404"
              time="13:00 - 14:30"
              location="Room 201, CS Building"
              instructor="Dr. James Miller"
              totalStudents={38}
              startingIn="2 hours 15 minutes"
            />
            <UpcomingClassCard
              title="Web Development"
              code="CS405"
              time="14:30 - 16:00"
              location="Lab 103, IT Building"
              instructor="Prof. Emily Davis"
              totalStudents={42}
              startingIn="3 hours 45 minutes"
            />
            <UpcomingClassCard
              title="Artificial Intelligence"
              code="CS406"
              time="16:00 - 17:30"
              location="Room 305, Engineering Block"
              instructor="Dr. Lisa Wang"
              totalStudents={35}
              startingIn="5 hours 15 minutes"
            />
          </div>
        </TabsContent>

        <TabsContent value="completed" className="m-0">
          <CompletedClassesTable />
        </TabsContent>

        <TabsContent value="all" className="m-0">
          <AllClassesTable />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function OngoingClassCard({
  title,
  code,
  time,
  location,
  instructor,
  attendanceRate,
  studentsPresent,
  totalStudents,
  status,
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <Badge className="mb-2 bg-green-500 hover:bg-green-600">{status}</Badge>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{code}</CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>View Attendance</DropdownMenuItem>
              <DropdownMenuItem>Send Notification</DropdownMenuItem>
              <DropdownMenuItem>End Class</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center text-sm">
            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{time}</span>
          </div>
          <div className="flex items-center text-sm">
            <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{location}</span>
          </div>
          <div className="flex items-center text-sm">
            <User className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{instructor}</span>
          </div>

          <div className="pt-2">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Attendance</span>
              <span className="text-sm font-medium">{attendanceRate}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-teal-600 h-2.5 rounded-full" style={{ width: `${attendanceRate}%` }}></div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {studentsPresent} of {totalStudents} students present
            </p>
          </div>

          <div className="flex space-x-2 pt-2">
            <Button className="flex-1">
              <FingerPrint className="mr-2 h-4 w-4" />
              Scanner
            </Button>
            <Button variant="outline" className="flex-1">
              <Users className="mr-2 h-4 w-4" />
              Students
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function UpcomingClassCard({ title, code, time, location, instructor, totalStudents, startingIn }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <Badge variant="outline" className="mb-2">
              Starting in {startingIn}
            </Badge>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{code}</CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Prepare Attendance</DropdownMenuItem>
              <DropdownMenuItem>Send Notification</DropdownMenuItem>
              <DropdownMenuItem>Reschedule</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center text-sm">
            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{time}</span>
          </div>
          <div className="flex items-center text-sm">
            <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{location}</span>
          </div>
          <div className="flex items-center text-sm">
            <User className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{instructor}</span>
          </div>
          <div className="flex items-center text-sm">
            <Users className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{totalStudents} students enrolled</span>
          </div>

          <div className="flex space-x-2 pt-2">
            <Button variant="outline" className="flex-1">
              <FingerPrint className="mr-2 h-4 w-4" />
              Prepare Scanner
            </Button>
            <Button className="flex-1">
              <BookOpen className="mr-2 h-4 w-4" />
              Class Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function CompletedClassesTable() {
  const completedClasses = [
    {
      id: 1,
      title: "Database Systems",
      code: "CS401",
      time: "09:00 - 10:30",
      instructor: "Dr. Sarah Johnson",
      attendanceRate: 92,
      studentsPresent: 42,
      totalStudents: 45,
    },
    {
      id: 2,
      title: "Software Engineering",
      code: "CS402",
      time: "09:30 - 11:00",
      instructor: "Prof. Michael Chen",
      attendanceRate: 88,
      studentsPresent: 35,
      totalStudents: 40,
    },
    {
      id: 3,
      title: "Computer Networks",
      code: "CS403",
      time: "10:00 - 11:30",
      instructor: "Dr. Robert Wilson",
      attendanceRate: 85,
      studentsPresent: 34,
      totalStudents: 40,
    },
    {
      id: 4,
      title: "Mobile App Development",
      code: "CS407",
      time: "08:00 - 09:30",
      instructor: "Prof. Jessica Lee",
      attendanceRate: 78,
      studentsPresent: 31,
      totalStudents: 40,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Completed Classes</CardTitle>
        <CardDescription>Classes that have been completed today</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium">Class</th>
                <th className="text-left py-3 px-4 font-medium">Time</th>
                <th className="text-left py-3 px-4 font-medium">Instructor</th>
                <th className="text-left py-3 px-4 font-medium">Attendance</th>
                <th className="text-left py-3 px-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {completedClasses.map((cls) => (
                <tr key={cls.id} className="border-b">
                  <td className="py-3 px-4">
                    <div className="font-medium">{cls.title}</div>
                    <div className="text-xs text-muted-foreground">{cls.code}</div>
                  </td>
                  <td className="py-3 px-4">{cls.time}</td>
                  <td className="py-3 px-4">{cls.instructor}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-full max-w-[100px] bg-gray-200 rounded-full h-2">
                        <div className="bg-teal-600 h-2 rounded-full" style={{ width: `${cls.attendanceRate}%` }}></div>
                      </div>
                      <span className="text-xs font-medium">
                        {cls.attendanceRate}% ({cls.studentsPresent}/{cls.totalStudents})
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

function AllClassesTable() {
  const allClasses = [
    {
      id: 1,
      title: "Database Systems",
      code: "CS401",
      time: "09:00 - 10:30",
      instructor: "Dr. Sarah Johnson",
      status: "Completed",
    },
    {
      id: 2,
      title: "Software Engineering",
      code: "CS402",
      time: "09:30 - 11:00",
      instructor: "Prof. Michael Chen",
      status: "Completed",
    },
    {
      id: 3,
      title: "Computer Networks",
      code: "CS403",
      time: "10:00 - 11:30",
      instructor: "Dr. Robert Wilson",
      status: "In Progress",
    },
    {
      id: 4,
      title: "Operating Systems",
      code: "CS404",
      time: "13:00 - 14:30",
      instructor: "Dr. James Miller",
      status: "Upcoming",
    },
    {
      id: 5,
      title: "Web Development",
      code: "CS405",
      time: "14:30 - 16:00",
      instructor: "Prof. Emily Davis",
      status: "Upcoming",
    },
    {
      id: 6,
      title: "Artificial Intelligence",
      code: "CS406",
      time: "16:00 - 17:30",
      instructor: "Dr. Lisa Wang",
      status: "Upcoming",
    },
    {
      id: 7,
      title: "Mobile App Development",
      code: "CS407",
      time: "08:00 - 09:30",
      instructor: "Prof. Jessica Lee",
      status: "Completed",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Classes</CardTitle>
        <CardDescription>Complete schedule for today</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium">Class</th>
                <th className="text-left py-3 px-4 font-medium">Time</th>
                <th className="text-left py-3 px-4 font-medium">Instructor</th>
                <th className="text-left py-3 px-4 font-medium">Status</th>
                <th className="text-left py-3 px-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allClasses.map((cls) => (
                <tr key={cls.id} className="border-b">
                  <td className="py-3 px-4">
                    <div className="font-medium">{cls.title}</div>
                    <div className="text-xs text-muted-foreground">{cls.code}</div>
                  </td>
                  <td className="py-3 px-4">{cls.time}</td>
                  <td className="py-3 px-4">{cls.instructor}</td>
                  <td className="py-3 px-4">
                    <Badge
                      className={
                        cls.status === "Completed"
                          ? "bg-gray-500"
                          : cls.status === "In Progress"
                            ? "bg-green-500"
                            : "bg-blue-500"
                      }
                    >
                      {cls.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <Button variant="outline" size="sm">
                      {cls.status === "Completed" ? "View Report" : "View Details"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
