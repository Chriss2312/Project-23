'use client';

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
import { API_ENDPOINTS, Department, NewTimetable, Timetable, fetchApi } from "@/lib/api"
import { useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { ClassAttendanceDialog } from "@/components/class-attendance-dialog";
import { ClassDetailsDialog } from "@/components/class-details-dialog";

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function ClassesPage() {
  const [classes, setClasses] = useState<Timetable[]>([])
  const [departments, setDepartments] = useState<Department[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all")
  const [selectedDay, setSelectedDay] = useState<string>("all")
  const { toast } = useToast()

  // Form state for adding new class
  const [newClass, setNewClass] = useState<NewTimetable>({
    subject: "",
    subject_code: "",
    instructor_name: "",
    department_id: "",
    day_of_week: 1,
    start_time: "",
    end_time: "",
    room: "",
    tolerance_minutes: 30,
    semester: "Fall 2024",
    academic_year: "2024-2025",
    timezone: "UTC"
  })

  const [selectedClassId, setSelectedClassId] = useState<string | undefined>()
  const [attendanceOpen, setAttendanceOpen] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof NewTimetable, string>>>({})
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string>("")

  const validateForm = () => {
    const errors: Partial<Record<keyof NewTimetable, string>> = {}
    
    if (!newClass.subject) errors.subject = "Subject is required"
    if (!newClass.subject_code) errors.subject_code = "Subject code is required"
    if (!newClass.instructor_name) errors.instructor_name = "Instructor name is required"
    if (!newClass.department_id || newClass.department_id.trim() === "") {
      errors.department_id = "Department is required"
    }
    if (!newClass.start_time) errors.start_time = "Start time is required"
    if (!newClass.end_time) errors.end_time = "End time is required"
    if (!newClass.room) errors.room = "Room is required"

    // Validate time format and logic
    if (newClass.start_time && newClass.end_time) {
      const start = new Date(`2000-01-01T${newClass.start_time}`)
      const end = new Date(`2000-01-01T${newClass.end_time}`)
      if (end <= start) {
        errors.end_time = "End time must be after start time"
      }
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleAddClass = async () => {
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly.",
        variant: "destructive",
      })
      return
    }

    if (!selectedDepartmentId) {
      toast({
        title: "Error",
        description: "Please select a department",
        variant: "destructive",
      })
      return;
    }

    try {
      const payload = {
        ...newClass,
        department_id: selectedDepartmentId
      };

      console.log('Sending payload:', payload);

      const response = await fetchApi<Timetable>(API_ENDPOINTS.createTimetable, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      toast({
        title: "Success",
        description: "Class added successfully",
      })

      // Reset form and close dialog
      setNewClass({
        subject: "",
        subject_code: "",
        instructor_name: "",
        department_id: "",
        day_of_week: 1,
        start_time: "",
        end_time: "",
        room: "",
        tolerance_minutes: 30,
        semester: "Fall 2024",
        academic_year: "2024-2025",
        timezone: "UTC"
      })
      setSelectedDepartmentId("");
      setAddDialogOpen(false)
      
      // Refresh both departments and classes
      await Promise.all([fetchDepartments(), fetchClasses()])
    } catch (err: any) {
      console.error('Failed to add class:', err)
      toast({
        title: "Error",
        description: err.message || "Failed to add class. Please try again.",
        variant: "destructive",
      })
    }
  }

  const fetchDepartments = async () => {
    try {
      const data = await fetchApi<Department[]>(API_ENDPOINTS.departments)
      setDepartments(data)
    } catch (err) {
      console.error('Failed to fetch departments:', err)
      toast({
        title: "Error",
        description: "Failed to load departments. Please refresh the page.",
        variant: "destructive",
      })
    }
  }

  const fetchClasses = async () => {
    try {
      setLoading(true)
      const departmentId = selectedDepartment !== "all" ? selectedDepartment : undefined
      const dayOfWeek = selectedDay !== "all" ? Number(selectedDay) : undefined
      const data = await fetchApi<Timetable[]>(API_ENDPOINTS.filteredTimetables(departmentId, dayOfWeek))
      setClasses(data)
      setError(null)
    } catch (err) {
      setError("Failed to load classes")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDepartments()
  }, [])

  useEffect(() => {
    fetchClasses()
  }, [selectedDepartment, selectedDay])

  const filteredClasses = classes.filter(cls => 
    cls.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.subject_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.instructor_name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return <div className="w-full h-full p-6">Loading...</div>
  }

  if (error) {
    return (
      <div className="w-full h-full p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen overflow-y-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Classes</h1>
          <p className="text-muted-foreground">Manage and view class attendance records</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button onClick={() => setAddDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Class
              </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search classes by name, code, or instructor..."
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
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedDay} onValueChange={setSelectedDay}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="All Days" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Days</SelectItem>
              {DAYS.map((day, index) => (
                <SelectItem key={day} value={index.toString()}>{day}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
        {filteredClasses.map((cls) => (
          <Card key={cls.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                  <CardTitle>{cls.subject}</CardTitle>
                  <CardDescription>{cls.subject_code}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center text-sm">
                      <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{departments.find(d => d.id === cls.department_id)?.name || 'Unknown Department'}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <User className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{cls.instructor_name}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{cls.start_time} - {cls.end_time}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>Room: {cls.room}</span>
                    </div>

                    <div className="flex space-x-2 pt-2">
                  <Button 
                    className="flex-1"
                    onClick={() => {
                      setSelectedClassId(cls.id)
                      setAttendanceOpen(true)
                    }}
                  >
                    View Attendance
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => {
                      setSelectedClassId(cls.id)
                      setDetailsOpen(true)
                    }}
                  >
                        <Calendar className="mr-2 h-4 w-4" />
                        Schedule
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

      <ClassAttendanceDialog
        classId={selectedClassId}
        open={attendanceOpen}
        onOpenChange={setAttendanceOpen}
      />

      <ClassDetailsDialog
        classId={selectedClassId}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />

      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Class</DialogTitle>
            <DialogDescription>Enter the details of the new class to add it to the system.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subject" className="text-right">
                Class Name
              </Label>
              <div className="col-span-3">
                <Input
                  id="subject"
                  value={newClass.subject}
                  onChange={(e) => setNewClass({ ...newClass, subject: e.target.value })}
                  placeholder="Database Systems"
                  className={formErrors.subject ? "border-red-500" : ""}
                />
                {formErrors.subject && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.subject}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subject_code" className="text-right">
                Class Code
              </Label>
              <div className="col-span-3">
                <Input
                  id="subject_code"
                  value={newClass.subject_code}
                  onChange={(e) => setNewClass({ ...newClass, subject_code: e.target.value })}
                  placeholder="CS401"
                  className={formErrors.subject_code ? "border-red-500" : ""}
                />
                {formErrors.subject_code && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.subject_code}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="department" className="text-right">
                Department
              </Label>
              <div className="col-span-3">
                <Select
                  value={selectedDepartmentId}
                  onValueChange={(value) => {
                    console.log('Selected department ID:', value);
                    setSelectedDepartmentId(value);
                    setNewClass(prev => ({
                      ...prev,
                      department_id: value
                    }));
                  }}
                >
                  <SelectTrigger className={formErrors.department_id ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept.id} value={dept.id}>
                        {dept.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formErrors.department_id && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.department_id}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Current department ID: {selectedDepartmentId || 'none'}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="instructor" className="text-right">
                Instructor
              </Label>
              <div className="col-span-3">
                <Input
                  id="instructor"
                  value={newClass.instructor_name}
                  onChange={(e) => setNewClass({ ...newClass, instructor_name: e.target.value })}
                  placeholder="Dr. Sarah Johnson"
                  className={formErrors.instructor_name ? "border-red-500" : ""}
                />
                {formErrors.instructor_name && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.instructor_name}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="day" className="text-right">
                Day
              </Label>
              <div className="col-span-3">
                <Select
                  value={newClass.day_of_week.toString()}
                  onValueChange={(value) => setNewClass({ ...newClass, day_of_week: parseInt(value) })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent>
                    {DAYS.map((day, index) => (
                      <SelectItem key={day} value={index.toString()}>{day}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="start_time" className="text-right">
                Start Time
              </Label>
              <div className="col-span-3">
                <Input
                  id="start_time"
                  type="time"
                  value={newClass.start_time}
                  onChange={(e) => setNewClass({ ...newClass, start_time: e.target.value })}
                  className={formErrors.start_time ? "border-red-500" : ""}
                />
                {formErrors.start_time && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.start_time}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="end_time" className="text-right">
                End Time
              </Label>
              <div className="col-span-3">
                <Input
                  id="end_time"
                  type="time"
                  value={newClass.end_time}
                  onChange={(e) => setNewClass({ ...newClass, end_time: e.target.value })}
                  className={formErrors.end_time ? "border-red-500" : ""}
                />
                {formErrors.end_time && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.end_time}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="room" className="text-right">
                Location
              </Label>
              <div className="col-span-3">
                <Input
                  id="room"
                  value={newClass.room}
                  onChange={(e) => setNewClass({ ...newClass, room: e.target.value })}
                  placeholder="Room 201, CS Building"
                  className={formErrors.room ? "border-red-500" : ""}
                />
                {formErrors.room && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.room}</p>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddClass}>
              Add Class
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
