import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  Download,
  Filter,
  MoreHorizontal,
  Search,
  UserPlus,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
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

export default function StudentsPage() {
  return (
    <div className="w-full h-full p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Students</h1>
          <p className="text-muted-foreground">Manage and view student attendance records</p>
        </div>
        <div className="flex items-center space-x-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add Student
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Student</DialogTitle>
                <DialogDescription>Enter the details of the new student to add them to the system.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Full Name
                  </Label>
                  <Input id="name" placeholder="John Smith" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="student-id" className="text-right">
                    Student ID
                  </Label>
                  <Input id="student-id" placeholder="CS2023001" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input id="email" placeholder="john.smith@example.com" className="col-span-3" />
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
                  <Label htmlFor="year" className="text-right">
                    Year
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">First Year</SelectItem>
                      <SelectItem value="2">Second Year</SelectItem>
                      <SelectItem value="3">Third Year</SelectItem>
                      <SelectItem value="4">Fourth Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Add Student</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search students by name, ID, or department..." className="pl-8 w-full" />
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
              <SelectValue placeholder="All Years" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              <SelectItem value="1">First Year</SelectItem>
              <SelectItem value="2">Second Year</SelectItem>
              <SelectItem value="3">Third Year</SelectItem>
              <SelectItem value="4">Fourth Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Students</TabsTrigger>
          <TabsTrigger value="low-attendance">Low Attendance</TabsTrigger>
          <TabsTrigger value="perfect-attendance">Perfect Attendance</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="m-0">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Student Directory</CardTitle>
                <CardDescription>Showing 1-10 of 1,248 students</CardDescription>
              </div>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export List
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Student</th>
                      <th className="text-left py-3 px-4 font-medium">ID</th>
                      <th className="text-left py-3 px-4 font-medium">Department</th>
                      <th className="text-left py-3 px-4 font-medium">Year</th>
                      <th className="text-left py-3 px-4 font-medium">Overall Attendance</th>
                      <th className="text-left py-3 px-4 font-medium">Status</th>
                      <th className="text-left py-3 px-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 10 }).map((_, i) => (
                      <tr key={i} className="border-b">
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                              <span className="text-xs font-medium">
                                {`${["JS", "EJ", "MB", "SD", "DW", "AK", "RL", "TM", "CP", "LW"][i]}`}
                              </span>
                            </div>
                            <div>
                              {`${
                                [
                                  "John Smith",
                                  "Emily Johnson",
                                  "Michael Brown",
                                  "Sarah Davis",
                                  "David Wilson",
                                  "Amanda Kim",
                                  "Robert Lee",
                                  "Thomas Miller",
                                  "Catherine Parker",
                                  "Laura Williams",
                                ][i]
                              }`}
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">{`CS2023${String(i + 1).padStart(3, "0")}`}</td>
                        <td className="py-3 px-4">
                          {
                            [
                              "Computer Science",
                              "Computer Science",
                              "Electrical Engineering",
                              "Electrical Engineering",
                              "Mechanical Engineering",
                              "Mechanical Engineering",
                              "Civil Engineering",
                              "Civil Engineering",
                              "Business Administration",
                              "Business Administration",
                            ][i]
                          }
                        </td>
                        <td className="py-3 px-4">{`${["1st", "2nd", "3rd", "4th"][i % 4]} Year`}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-full max-w-[100px] bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  [92, 88, 95, 78, 85, 65, 98, 72, 80, 90][i] < 75 ? "bg-red-500" : "bg-teal-600"
                                }`}
                                style={{ width: `${[92, 88, 95, 78, 85, 65, 98, 72, 80, 90][i]}%` }}
                              ></div>
                            </div>
                            <span className="text-xs font-medium">{[92, 88, 95, 78, 85, 65, 98, 72, 80, 90][i]}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge
                            className={
                              [92, 88, 95, 78, 85, 65, 98, 72, 80, 90][i] < 75
                                ? "bg-red-500"
                                : [92, 88, 95, 78, 85, 65, 98, 72, 80, 90][i] >= 90
                                  ? "bg-green-500"
                                  : "bg-teal-600"
                            }
                          >
                            {[92, 88, 95, 78, 85, 65, 98, 72, 80, 90][i] < 75
                              ? "At Risk"
                              : [92, 88, 95, 78, 85, 65, 98, 72, 80, 90][i] >= 90
                                ? "Excellent"
                                : "Good"}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Profile</DropdownMenuItem>
                              <DropdownMenuItem>View Attendance</DropdownMenuItem>
                              <DropdownMenuItem>Send Notification</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">Mark Absent</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground">Showing 1-10 of 1,248 students</div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="low-attendance" className="m-0">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Students with Low Attendance</CardTitle>
                <CardDescription>Students below 75% attendance threshold</CardDescription>
              </div>
              <Button variant="outline">
                <AlertCircle className="mr-2 h-4 w-4" />
                Send Notifications
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Student</th>
                      <th className="text-left py-3 px-4 font-medium">ID</th>
                      <th className="text-left py-3 px-4 font-medium">Department</th>
                      <th className="text-left py-3 px-4 font-medium">Attendance</th>
                      <th className="text-left py-3 px-4 font-medium">Missing Classes</th>
                      <th className="text-left py-3 px-4 font-medium">Last Present</th>
                      <th className="text-left py-3 px-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        name: "Amanda Kim",
                        id: "CS2023006",
                        department: "Mechanical Engineering",
                        attendance: 65,
                        missing: 12,
                        lastPresent: "2 days ago",
                      },
                      {
                        name: "Thomas Miller",
                        id: "CS2023008",
                        department: "Civil Engineering",
                        attendance: 72,
                        missing: 8,
                        lastPresent: "Today",
                      },
                    ].map((student, i) => (
                      <tr key={i} className="border-b">
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                              <span className="text-xs font-medium">
                                {student.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </span>
                            </div>
                            <div>{student.name}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4">{student.id}</td>
                        <td className="py-3 px-4">{student.department}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-full max-w-[100px] bg-gray-200 rounded-full h-2">
                              <div
                                className="h-2 rounded-full bg-red-500"
                                style={{ width: `${student.attendance}%` }}
                              ></div>
                            </div>
                            <span className="text-xs font-medium">{student.attendance}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">{student.missing} classes</td>
                        <td className="py-3 px-4">{student.lastPresent}</td>
                        <td className="py-3 px-4">
                          <Button variant="outline" size="sm">
                            Contact
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

        <TabsContent value="perfect-attendance" className="m-0">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Students with Perfect Attendance</CardTitle>
                <CardDescription>Students with 90% or higher attendance</CardDescription>
              </div>
              <Button variant="outline">
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Send Recognition
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Student</th>
                      <th className="text-left py-3 px-4 font-medium">ID</th>
                      <th className="text-left py-3 px-4 font-medium">Department</th>
                      <th className="text-left py-3 px-4 font-medium">Attendance</th>
                      <th className="text-left py-3 px-4 font-medium">Consecutive Days</th>
                      <th className="text-left py-3 px-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        name: "John Smith",
                        id: "CS2023001",
                        department: "Computer Science",
                        attendance: 92,
                        consecutive: 45,
                      },
                      {
                        name: "Michael Brown",
                        id: "CS2023003",
                        department: "Electrical Engineering",
                        attendance: 95,
                        consecutive: 60,
                      },
                      {
                        name: "Robert Lee",
                        id: "CS2023007",
                        department: "Civil Engineering",
                        attendance: 98,
                        consecutive: 75,
                      },
                      {
                        name: "Laura Williams",
                        id: "CS2023010",
                        department: "Business Administration",
                        attendance: 90,
                        consecutive: 30,
                      },
                    ].map((student, i) => (
                      <tr key={i} className="border-b">
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                              <span className="text-xs font-medium">
                                {student.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </span>
                            </div>
                            <div>{student.name}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4">{student.id}</td>
                        <td className="py-3 px-4">{student.department}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-full max-w-[100px] bg-gray-200 rounded-full h-2">
                              <div
                                className="h-2 rounded-full bg-green-500"
                                style={{ width: `${student.attendance}%` }}
                              ></div>
                            </div>
                            <span className="text-xs font-medium">{student.attendance}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">{student.consecutive} days</td>
                        <td className="py-3 px-4">
                          <Button variant="outline" size="sm">
                            View Profile
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
