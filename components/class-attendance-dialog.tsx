'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { API_ENDPOINTS, fetchApi } from "@/lib/api";
import { useEffect, useState } from "react";

interface ClassAttendanceDialogProps {
  classId?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface ClassReport {
  class_info: {
    subject: string;
    code: string;
    total_students: number;
    total_sessions: number;
  };
  student_attendance: Array<{
    student_id: string;
    name: string;
    total_sessions: number;
    sessions_attended: number;
    attendance_rate: number;
  }>;
  session_statistics: Array<{
    date: string;
    present: number;
    absent: number;
    attendance_rate: number;
  }>;
  overall_attendance_rate: number;
}

export function ClassAttendanceDialog({
  classId,
  open,
  onOpenChange,
}: ClassAttendanceDialogProps) {
  const [report, setReport] = useState<ClassReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open && classId) {
      const fetchReport = async () => {
        try {
          setLoading(true);
          const data = await fetchApi<ClassReport>(API_ENDPOINTS.classReport(classId));
          setReport(data);
          setError(null);
        } catch (err) {
          setError('Failed to load attendance report');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchReport();
    }
  }, [open, classId]);

  if (!open) return null;

  if (loading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Loading attendance report...</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  if (error) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Error</DialogTitle>
          </DialogHeader>
          <div className="text-red-500">{error}</div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!report) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {report.class_info.subject} ({report.class_info.code}) - Attendance Report
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Overall Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="font-medium">Total Students:</dt>
                  <dd>{report.class_info.total_students}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Total Sessions:</dt>
                  <dd>{report.class_info.total_sessions}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Overall Attendance Rate:</dt>
                  <dd>{report.overall_attendance_rate.toFixed(1)}%</dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Attendance Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[150px] w-full">
                {/* Add a chart here if needed */}
                <div className="text-sm text-muted-foreground">
                  Last {report.session_statistics.length} sessions
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Student Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Student</th>
                    <th className="text-left py-3 px-4 font-medium">ID</th>
                    <th className="text-left py-3 px-4 font-medium">Sessions Attended</th>
                    <th className="text-left py-3 px-4 font-medium">Attendance Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {report.student_attendance.map((student) => (
                    <tr key={student.student_id} className="border-b">
                      <td className="py-3 px-4">{student.name}</td>
                      <td className="py-3 px-4">{student.student_id}</td>
                      <td className="py-3 px-4">
                        {student.sessions_attended}/{student.total_sessions}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                student.attendance_rate < 75
                                  ? "bg-red-500"
                                  : student.attendance_rate >= 90
                                  ? "bg-green-500"
                                  : "bg-yellow-500"
                              }`}
                              style={{ width: `${student.attendance_rate}%` }}
                            />
                          </div>
                          <span>{student.attendance_rate.toFixed(1)}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Session History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Date</th>
                    <th className="text-left py-3 px-4 font-medium">Present</th>
                    <th className="text-left py-3 px-4 font-medium">Absent</th>
                    <th className="text-left py-3 px-4 font-medium">Attendance Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {report.session_statistics.map((session) => (
                    <tr key={session.date} className="border-b">
                      <td className="py-3 px-4">
                        {new Date(session.date).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">{session.present}</td>
                      <td className="py-3 px-4">{session.absent}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                session.attendance_rate < 75
                                  ? "bg-red-500"
                                  : session.attendance_rate >= 90
                                  ? "bg-green-500"
                                  : "bg-yellow-500"
                              }`}
                              style={{ width: `${session.attendance_rate}%` }}
                            />
                          </div>
                          <span>{session.attendance_rate.toFixed(1)}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
} 