'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { API_ENDPOINTS, fetchApi } from "@/lib/api";
import { useEffect, useState } from "react";
import { Clock, MapPin, User, Users, BookOpen, Calendar } from "lucide-react";

interface ClassDetailsDialogProps {
  classId?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface ClassDetails {
  id: string;
  subject: string;
  code: string;
  day_of_week: number;
  time: string;
  room: string;
  instructor: string;
  students: Array<{
    id: string;
    student_id: string;
    name: string;
    email: string;
    department: string | null;
  }>;
}

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function ClassDetailsDialog({
  classId,
  open,
  onOpenChange,
}: ClassDetailsDialogProps) {
  const [details, setDetails] = useState<ClassDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open && classId) {
      const fetchDetails = async () => {
        try {
          setLoading(true);
          const data = await fetchApi<ClassDetails>(API_ENDPOINTS.classDetails(classId));
          setDetails(data);
          setError(null);
        } catch (err) {
          setError('Failed to load class details');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchDetails();
    }
  }, [open, classId]);

  if (!open) return null;

  if (loading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Loading class details...</DialogTitle>
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

  if (!details) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {details.subject} ({details.code})
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Schedule Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Day:</span>
                    <span>{DAYS[details.day_of_week]}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Time:</span>
                    <span>{details.time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Location:</span>
                    <span>{details.room}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Instructor:</span>
                    <span>{details.instructor}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Enrolled Students:</span>
                    <span>{details.students.length}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Enrolled Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Student</th>
                      <th className="text-left py-3 px-4 font-medium">ID</th>
                      <th className="text-left py-3 px-4 font-medium">Department</th>
                      <th className="text-left py-3 px-4 font-medium">Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {details.students.map((student) => (
                      <tr key={student.id} className="border-b">
                        <td className="py-3 px-4">{student.name}</td>
                        <td className="py-3 px-4">{student.student_id}</td>
                        <td className="py-3 px-4">{student.department || 'N/A'}</td>
                        <td className="py-3 px-4">{student.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
} 