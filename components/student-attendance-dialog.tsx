import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Student, API_ENDPOINTS, API_BASE_URL, fetchApi } from "@/lib/api"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface StudentAttendanceDialogProps {
  student: Student | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface AttendanceRecord {
  date: string;
  time_in: string;
  subject: string;
  status: 'on_time' | 'late' | 'very_late' | 'absent';
}

export function StudentAttendanceDialog({ student, open, onOpenChange }: StudentAttendanceDialogProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);

  useEffect(() => {
    if (open && student) {
      fetchAttendanceRecords();
    }
  }, [open, student]);

  const fetchAttendanceRecords = async () => {
    if (!student) return;
    
    try {
      setLoading(true);
      const data = await fetchApi<AttendanceRecord[]>(API_ENDPOINTS.studentAttendance(student.id));
      setAttendance(data);
      setError(null);
    } catch (err) {
      setError('Failed to load attendance records');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!student) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Attendance Records - {student.name}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Total Classes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{student.total_classes}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Classes Attended</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{student.classes_attended}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Attendance Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{student.attendance_rate}%</div>
              </CardContent>
            </Card>
          </div>

          {loading ? (
            <div className="text-center py-8">Loading attendance records...</div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Date</th>
                    <th className="text-left py-3 px-4 font-medium">Time</th>
                    <th className="text-left py-3 px-4 font-medium">Subject</th>
                    <th className="text-left py-3 px-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attendance.map((record, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-3 px-4">
                        {new Date(record.date).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">{record.time_in}</td>
                      <td className="py-3 px-4">{record.subject}</td>
                      <td className="py-3 px-4">
                        <Badge
                          className={
                            record.status === "on_time"
                              ? "bg-green-500"
                              : record.status === "late"
                                ? "bg-yellow-500"
                                : record.status === "very_late"
                                  ? "bg-orange-500"
                                  : "bg-red-500"
                          }
                        >
                          {record.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                  {attendance.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-muted-foreground">
                        No attendance records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
} 