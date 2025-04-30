import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  Calendar,
  ChevronDown,
  Clock,
  Download,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  User,
  Users,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

export default function ClassesPage() {
  return (
    <div className="w-full h-full p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Classes</h1>
          <p className="text-muted-foreground">Manage and view class attendance records</p>
        </div>
        <div className="flex items-center space-x-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Class
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Class</DialogTitle>
                <DialogDescription>Enter the details of the new class to add it to the system.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="class-name" className="text-right">
                    Class Name
                  </Label>
                  <Input id="class-name" placeholder="Database Systems" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="class-code" className="text-right">
                    Class Code
                  </Label>
                  <Input id="class-code" placeholder="CS401" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="department" className="text-right">
                    Department
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cs">Computer Science</SelectItem>
                      <SelectItem value="ee">Electrical Engineering</SelectItem>
                      <SelectItem value="me">Mechanical Engineering</SelectItem>
                      <SelectItem value="ce">Civil Engineering</SelectItem>
                      <SelectItem value="ba">Business Administration</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="instructor" className="text-right">
                    Instructor
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select instructor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sj">Dr. Sarah Johnson</SelectItem>
                      <SelectItem value="mc">Prof. Michael Chen</SelectItem>
                      <SelectItem value="rw">Dr. Robert Wilson</SelectItem>
                      <SelectItem value="jm">Dr. James Miller</SelectItem>
                      <SelectItem value="ed">Prof. Emily Davis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="schedule" className="text-right">
                    Schedule
                  </Label>
                  <Input id="schedule" placeholder="MWF 09:00 - 10:30" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">
                    Location
                  </Label>
                  <Input id="location" placeholder="Room 201, CS Building" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Add Class</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search classes by name, code, or instructor..." className="pl-8 w-full" />
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="flex items-center">
            <Filter className="mr-2 h-4 w-4" />
            Filters
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Departments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="cs">Computer Science</SelectItem>
              <SelectItem value="ee">Electrical Engineering</SelectItem>
              <SelectItem value="me">Mechanical Engineering</SelectItem>
              <SelectItem value="ce">Civil Engineering</SelectItem>
              <SelectItem value="ba">Business Administration</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="All Days" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Days</SelectItem>
              <SelectItem value="mon">Monday</SelectItem>
              <SelectItem value="tue">Tuesday</SelectItem>
              <SelectItem value="wed">Wednesday</SelectItem>
              <SelectItem value="thu">Thursday</SelectItem>
              <SelectItem value="fri">Friday</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Classes</TabsTrigger>
          <TabsTrigger value="active">Active Classes</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Classes</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="m-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Database Systems",
                code: "CS401",
                department: "Computer Science",
                instructor: "Dr. Sarah Johnson",
                schedule: "MWF 09:00 - 10:30",
                location: "Room 201, CS Building",
                students: 45,
                avgAttendance: 92,
              },
              {
                title: "Software Engineering",
                code: "CS402",
                department: "Computer Science",
                instructor: "Prof. Michael Chen",
                schedule: "TTh 09:30 - 11:00",
                location: "Room 305, Engineering Block",
                students: 40,
                avgAttendance: 88,
              },
              {
                title: "Computer Networks",
                code: "CS403",
                department: "Computer Science",
                instructor: "Dr. Robert Wilson",
                schedule: "MWF 10:00 - 11:30",
                location: "Lab 102, IT Building",
                students: 40,
                avgAttendance: 85,
              },
              {
                title: "Operating Systems",
                code: "CS404",
                department: "Computer Science",
                instructor: "Dr. James Miller",
                schedule: "TTh 13:00 - 14:30",
                location: "Room 201, CS Building",
                students: 38,
                avgAttendance: 80,
              },
              {
                title: "Web Development",
                code: "CS405",
                department: "Computer Science",
                instructor: "Prof. Emily Davis",
                schedule: "MWF 14:30 - 16:00",
                location: "Lab 103, IT Building",
                students: 42,
                avgAttendance: 82,
              },
              {
                title: "Artificial Intelligence",
                code: "CS406",
                department: "Computer Science",
                instructor: "Dr. Lisa Wang",
                schedule: "TTh 16:00 - 17:30",
                location: "Room 305, Engineering Block",
                students: 35,
                avgAttendance: 78,
              },
            ].map((cls, i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{cls.title}</CardTitle>
                      <CardDescription>{cls.code}</CardDescription>
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
                        <DropdownMenuItem>Edit Class</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">Cancel Class</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center text-sm">
                      <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{cls.department}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <User className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{cls.instructor}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{cls.schedule}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{cls.students} students enrolled</span>
                    </div>

                    <div className="pt-2">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Avg. Attendance</span>
                        <span className="text-sm font-medium">{cls.avgAttendance}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full ${cls.avgAttendance < 75 ? "bg-red-500" : "bg-teal-600"}`}
                          style={{ width: `${cls.avgAttendance}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex space-x-2 pt-2">
                      <Button className="flex-1">View Attendance</Button>
                      <Button variant="outline" className="flex-1">
                        <Calendar className="mr-2 h-4 w-4" />
                        Schedule
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active" className="m-0">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Active Classes</CardTitle>
                <CardDescription>Classes currently in session</CardDescription>
              </div>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Class</th>
                      <th className="text-left py-3 px-4 font-medium">Instructor</th>
                      <th className="text-left py-3 px-4 font-medium">Time</th>
                      <th className="text-left py-3 px-4 font-medium">Location</th>
                      <th className="text-left py-3 px-4 font-medium">Attendance</th>
                      <th className="text-left py-3 px-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        title: "Database Systems",
                        code: "CS401",
                        instructor: "Dr. Sarah Johnson",
                        time: "09:00 - 10:30",
                        location: "Room 201, CS Building",
                        attendance: "42/45 (92%)",
                      },
                      {
                        title: "Software Engineering",
                        code: "CS402",
                        instructor: "Prof. Michael Chen",
                        time: "09:30 - 11:00",
                        location: "Room 305, Engineering Block",
                        attendance: "35/40 (88%)",
                      },
                      {
                        title: "Computer Networks",
                        code: "CS403",
                        instructor: "Dr. Robert Wilson",
                        time: "10:00 - 11:30",
                        location: "Lab 102, IT Building",
                        attendance: "34/40 (85%)",
                      },
                    ].map((cls, i) => (
                      <tr key={i} className="border-b">
                        <td className="py-3 px-4">
                          <div className="font-medium">{cls.title}</div>
                          <div className="text-xs text-muted-foreground">{cls.code}</div>
                        </td>
                        <td className="py-3 px-4">{cls.instructor}</td>
                        <td className="py-3 px-4">{cls.time}</td>
                        <td className="py-3 px-4">{cls.location}</td>
                        <td className="py-3 px-4">{cls.attendance}</td>
                        <td className="py-3 px-4">
                          <Button variant="outline" size="sm">
                            View Live
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upcoming" className="m-0">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Upcoming Classes</CardTitle>
                <CardDescription>Classes scheduled for later today</CardDescription>
              </div>
              <Button variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                View Calendar
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Class</th>
                      <th className="text-left py-3 px-4 font-medium">Instructor</th>
                      <th className="text-left py-3 px-4 font-medium">Time</th>
                      <th className="text-left py-3 px-4 font-medium">Location</th>
                      <th className="text-left py-3 px-4 font-medium">Students</th>
                      <th className="text-left py-3 px-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        title: "Operating Systems",
                        code: "CS404",
                        instructor: "Dr. James Miller",
                        time: "13:00 - 14:30",
                        location: "Room 201, CS Building",
                        students: 38,
                      },
                      {
                        title: "Web Development",
                        code: "CS405",
                        instructor: "Prof. Emily Davis",
                        time: "14:30 - 16:00",
                        location: "Lab 103, IT Building",
                        students: 42,
                      },
                      {
                        title: "Artificial Intelligence",
                        code: "CS406",
                        instructor: "Dr. Lisa Wang",
                        time: "16:00 - 17:30",
                        location: "Room 305, Engineering Block",
                        students: 35,
                      },
                    ].map((cls, i) => (
                      <tr key={i} className="border-b">
                        <td className="py-3 px-4">
                          <div className="font-medium">{cls.title}</div>
                          <div className="text-xs text-muted-foreground">{cls.code}</div>
                        </td>
                        <td className="py-3 px-4">{cls.instructor}</td>
                        <td className="py-3 px-4">{cls.time}</td>
                        <td className="py-3 px-4">{cls.location}</td>
                        <td className="py-3 px-4">{cls.students} enrolled</td>
                        <td className="py-3 px-4">
                          <Button variant="outline" size="sm">
                            Prepare Scanner
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
