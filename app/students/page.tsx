'use client';

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
import { API_ENDPOINTS, Student, StudentStats, fetchApi } from "@/lib/api"
import { useEffect, useState } from "react"
import { ExportButton } from "@/components/ExportButton"
import { StudentProfileDialog } from "@/components/student-profile-dialog"
import { StudentAttendanceDialog } from "@/components/student-attendance-dialog"
import { SendNotificationDialog } from "@/components/send-notification-dialog"
import { useToast } from "@/components/ui/use-toast"

export default function StudentsPage() {
  const [stats, setStats] = useState<StudentStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [currentTab, setCurrentTab] = useState<'all' | 'low-attendance' | 'perfect-attendance'>('all');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [attendanceOpen, setAttendanceOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const { toast } = useToast();

  const fetchStudents = async (department?: string, attendance?: 'low' | 'perfect' | 'all') => {
    try {
      setLoading(true);
      const actualDepartment = department && !['_all', '_none'].includes(department) ? department : undefined;
      const data = await fetchApi<StudentStats>(API_ENDPOINTS.studentStats(actualDepartment, attendance));
      setStats(data);
      setError(null);
    } catch (err) {
      setError('Failed to load student data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const attendanceMap = {
      'all': 'all' as const,
      'low-attendance': 'low' as const,
      'perfect-attendance': 'perfect' as const
    };
    
    fetchStudents(selectedDepartment, attendanceMap[currentTab]);
  }, [selectedDepartment, currentTab]);

  const filteredStudents = stats?.students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.student_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (student.department?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  ) || [];

  const handleMarkAbsent = async (student: Student) => {
    try {
      await fetchApi(API_ENDPOINTS.studentMarkAbsent(student.id), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      toast({
        title: "Success",
        description: `${student.name} has been marked as absent.`,
      });

      // Refresh the student list
      fetchStudents(selectedDepartment, currentTab === 'all' ? 'all' : currentTab === 'low-attendance' ? 'low' : 'perfect');
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to mark student as absent. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="w-full h-full p-6">Loading...</div>;
  }

  if (error) {
    return (
      <div className="w-full h-full p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      </div>
    );
  }

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
                      <SelectItem value="_none">Select department</SelectItem>
                      {stats?.departments.map(dept => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
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
          <Input 
            type="search" 
            placeholder="Search students by name, ID, or department..." 
            className="pl-8 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="flex items-center">
            <Filter className="mr-2 h-4 w-4" />
            Filters
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Departments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="_all">All Departments</SelectItem>
              {stats?.departments.map(dept => (
                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs value={currentTab} onValueChange={(value: any) => setCurrentTab(value)}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">
            All Students ({stats?.summary.total_students || 0})
          </TabsTrigger>
          <TabsTrigger value="low-attendance">
            Low Attendance ({stats?.summary.low_attendance_count || 0})
          </TabsTrigger>
          <TabsTrigger value="perfect-attendance">
            Perfect Attendance ({stats?.summary.perfect_attendance_count || 0})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="m-0">
          <StudentTable 
            students={filteredStudents}
            showExport={currentTab === 'all'}
            showNotify={currentTab === 'low-attendance'}
            showRecognition={currentTab === 'perfect-attendance'}
            onViewProfile={(student) => {
              setSelectedStudent(student);
              setProfileOpen(true);
            }}
            onViewAttendance={(student) => {
              setSelectedStudent(student);
              setAttendanceOpen(true);
            }}
            onSendNotification={(student) => {
              setSelectedStudent(student);
              setNotificationOpen(true);
            }}
            onMarkAbsent={handleMarkAbsent}
          />
        </TabsContent>

        <TabsContent value="low-attendance" className="m-0">
          <StudentTable 
            students={filteredStudents}
            showExport={currentTab === 'all'}
            showNotify={currentTab === 'low-attendance'}
            showRecognition={currentTab === 'perfect-attendance'}
            onViewProfile={(student) => {
              setSelectedStudent(student);
              setProfileOpen(true);
            }}
            onViewAttendance={(student) => {
              setSelectedStudent(student);
              setAttendanceOpen(true);
            }}
            onSendNotification={(student) => {
              setSelectedStudent(student);
              setNotificationOpen(true);
            }}
            onMarkAbsent={handleMarkAbsent}
          />
        </TabsContent>

        <TabsContent value="perfect-attendance" className="m-0">
          <StudentTable 
            students={filteredStudents}
            showExport={currentTab === 'all'}
            showNotify={currentTab === 'low-attendance'}
            showRecognition={currentTab === 'perfect-attendance'}
            onViewProfile={(student) => {
              setSelectedStudent(student);
              setProfileOpen(true);
            }}
            onViewAttendance={(student) => {
              setSelectedStudent(student);
              setAttendanceOpen(true);
            }}
            onSendNotification={(student) => {
              setSelectedStudent(student);
              setNotificationOpen(true);
            }}
            onMarkAbsent={handleMarkAbsent}
          />
        </TabsContent>
      </Tabs>

      <StudentProfileDialog
        student={selectedStudent}
        open={profileOpen}
        onOpenChange={setProfileOpen}
      />

      <StudentAttendanceDialog
        student={selectedStudent}
        open={attendanceOpen}
        onOpenChange={setAttendanceOpen}
      />

      <SendNotificationDialog
        student={selectedStudent}
        open={notificationOpen}
        onOpenChange={setNotificationOpen}
      />
    </div>
  )
}

interface StudentTableProps {
  students: Student[];
  showExport?: boolean;
  showNotify?: boolean;
  showRecognition?: boolean;
  onViewProfile: (student: Student) => void;
  onViewAttendance: (student: Student) => void;
  onSendNotification: (student: Student) => void;
  onMarkAbsent: (student: Student) => void;
}

function StudentTable({ 
  students, 
  showExport, 
  showNotify, 
  showRecognition,
  onViewProfile,
  onViewAttendance,
  onSendNotification,
  onMarkAbsent
}: StudentTableProps) {
  return (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Student Directory</CardTitle>
          <CardDescription>Showing {students.length} students</CardDescription>
              </div>
        {showExport && <ExportButton students={students} />}
        {showNotify && (
          <Button variant="outline">
            <AlertCircle className="mr-2 h-4 w-4" />
            Send Notifications
          </Button>
        )}
        {showRecognition && (
              <Button variant="outline">
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Send Recognition
              </Button>
        )}
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Student</th>
                      <th className="text-left py-3 px-4 font-medium">ID</th>
                      <th className="text-left py-3 px-4 font-medium">Department</th>
                      <th className="text-left py-3 px-4 font-medium">Overall Attendance</th>
                <th className="text-left py-3 px-4 font-medium">Last Present</th>
                      <th className="text-left py-3 px-4 font-medium">Status</th>
                      <th className="text-left py-3 px-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
              {students.map((student) => (
                <tr key={student.id} className="border-b">
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                              <span className="text-xs font-medium">
                          {student.name.split(" ").map(n => n[0]).join("")}
                              </span>
                            </div>
                            <div>
                        {student.name}
                        <div className="text-xs text-muted-foreground">{student.email}</div>
                            </div>
                          </div>
                        </td>
                  <td className="py-3 px-4">{student.student_id}</td>
                  <td className="py-3 px-4">{student.department || 'N/A'}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-full max-w-[100px] bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                            student.attendance_rate < 75 ? "bg-red-500" : 
                            student.attendance_rate >= 90 ? "bg-green-500" : "bg-teal-600"
                                }`}
                          style={{ width: `${student.attendance_rate}%` }}
                              ></div>
                            </div>
                      <span className="text-xs font-medium">
                        {student.attendance_rate}% ({student.classes_attended}/{student.total_classes})
                      </span>
                          </div>
                        </td>
                  <td className="py-3 px-4">
                    {student.last_attendance 
                      ? new Date(student.last_attendance).toLocaleDateString()
                      : 'Never'
                    }
                        </td>
                        <td className="py-3 px-4">
                          <Badge
                            className={
                        student.status === "At Risk"
                                ? "bg-red-500"
                          : student.status === "Excellent"
                                  ? "bg-green-500"
                                  : "bg-teal-600"
                            }
                          >
                      {student.status}
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
                        <DropdownMenuItem onClick={() => onViewProfile(student)}>
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onViewAttendance(student)}>
                          View Attendance
                        </DropdownMenuItem>
                        
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
              {students.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-muted-foreground">
                    No students found
                        </td>
                      </tr>
              )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
  );
}
