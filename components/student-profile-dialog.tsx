import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Student } from "@/lib/api"
import { Badge } from "@/components/ui/badge"

interface StudentProfileDialogProps {
  student: Student | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function StudentProfileDialog({ student, open, onOpenChange }: StudentProfileDialogProps) {
  if (!student) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Student Profile</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-xl font-medium">
                {student.name.split(" ").map(n => n[0]).join("")}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-semibold">{student.name}</h3>
              <p className="text-sm text-muted-foreground">{student.email}</p>
            </div>
          </div>

          <div className="grid gap-2">
            <div className="flex justify-between py-2 border-b">
              <span className="font-medium">Student ID</span>
              <span>{student.student_id}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="font-medium">Department</span>
              <span>{student.department || 'N/A'}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="font-medium">Overall Attendance</span>
              <div className="flex items-center gap-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      student.attendance_rate < 75 ? "bg-red-500" : 
                      student.attendance_rate >= 90 ? "bg-green-500" : "bg-teal-600"
                    }`}
                    style={{ width: `${student.attendance_rate}%` }}
                  ></div>
                </div>
                <span>{student.attendance_rate}%</span>
              </div>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="font-medium">Classes Attended</span>
              <span>{student.classes_attended} / {student.total_classes}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="font-medium">Last Present</span>
              <span>{student.last_attendance ? new Date(student.last_attendance).toLocaleDateString() : 'Never'}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="font-medium">Status</span>
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
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 