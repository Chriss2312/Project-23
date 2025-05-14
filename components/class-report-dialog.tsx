'use client';

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { API_ENDPOINTS, ClassReport, fetchApi } from "@/lib/api";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ClassReportDialogProps {
  classId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ClassReportDialog({
  classId,
  open,
  onOpenChange,
}: ClassReportDialogProps) {
  const [report, setReport] = useState<ClassReport | null>(null);
  const [loading, setLoading] = useState(true);
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
          setError('Failed to load class report');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchReport();
    }
  }, [classId, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Class Report</DialogTitle>
        </DialogHeader>
        {loading ? (
          <div className="py-8 text-center">Loading...</div>
        ) : error ? (
          <div className="py-8 text-center text-red-500">{error}</div>
        ) : report ? (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Class Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-2">
                    <div>
                      <dt className="text-sm text-muted-foreground">Subject</dt>
                      <dd className="font-medium">{report.class_info.subject}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-muted-foreground">Code</dt>
                      <dd>{report.class_info.code}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-muted-foreground">Total Students</dt>
                      <dd>{report.class_info.total_students}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-muted-foreground">Total Sessions</dt>
                      <dd>{report.class_info.total_sessions}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Overall Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">
                      {report.overall_attendance_rate}%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Average Attendance Rate
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Student Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[200px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Sessions Attended</TableHead>
                        <TableHead>Attendance Rate</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {report.student_attendance.map((student) => (
                        <TableRow key={student.student_id}>
                          <TableCell>{student.student_id}</TableCell>
                          <TableCell>{student.name}</TableCell>
                          <TableCell>
                            {student.sessions_attended} / {student.total_sessions}
                          </TableCell>
                          <TableCell>{student.attendance_rate}%</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Session History</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[200px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Present</TableHead>
                        <TableHead>Absent</TableHead>
                        <TableHead>Attendance Rate</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {report.session_statistics.map((session) => (
                        <TableRow key={session.date}>
                          <TableCell>{new Date(session.date).toLocaleDateString()}</TableCell>
                          <TableCell>{session.present}</TableCell>
                          <TableCell>{session.absent}</TableCell>
                          <TableCell>{session.attendance_rate}%</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
} 