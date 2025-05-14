'use client';

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { API_ENDPOINTS, WeeklyClassesResponse, TimetableClass, fetchApi } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, User, Users } from "lucide-react";

export default function CalendarPage() {
  const [weeklyClasses, setWeeklyClasses] = useState<WeeklyClassesResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const data = await fetchApi<WeeklyClassesResponse>(API_ENDPOINTS.weeklyClasses);
        setWeeklyClasses(data);
      } catch (err) {
        setError('Failed to load weekly classes');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

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

  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const;

  return (
    <div className="w-full h-full p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Weekly Schedule</h1>
      </div>

      <div className="grid gap-6">
        {days.map((day) => (
          <Card key={day}>
            <CardHeader>
              <CardTitle className="capitalize">{day}</CardTitle>
            </CardHeader>
            <CardContent>
              {weeklyClasses && weeklyClasses[day].length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {weeklyClasses[day].map((cls) => (
                    <ClassCard key={cls.id} {...cls} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  No classes scheduled
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ClassCard({
  title,
  code,
  time,
  location,
  instructor,
  totalStudents,
}: TimetableClass) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div>
          <CardTitle className="text-lg">{title}</CardTitle>
          <p className="text-sm text-muted-foreground">{code}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
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
        </div>
      </CardContent>
    </Card>
  );
} 