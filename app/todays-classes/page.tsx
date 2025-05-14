'use client';

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  Calendar,
  Clock,
  MapPin,
  MoreHorizontal,
  Search,
  User,
  Users,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { API_ENDPOINTS, fetchApi, TimetableClass, TodayClassesResponse } from "@/lib/api"
import { useEffect, useState } from "react"
import { ClassDetailsDialog } from "@/components/class-details-dialog"
import { ClassReportDialog } from "@/components/class-report-dialog"

export default function TodaysClassesPage() {
  const [classes, setClasses] = useState<TodayClassesResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const data = await fetchApi<TodayClassesResponse>(API_ENDPOINTS.todayClasses);
        setClasses(data);
      } catch (err) {
        setError('Failed to load classes');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
    // Refresh every minute
    const interval = setInterval(fetchClasses, 60000);
    return () => clearInterval(interval);
  }, []);

  const today = new Date();
  const dateString = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

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
          <h1 className="text-3xl font-bold">Today's Classes</h1>
          <p className="text-muted-foreground">{dateString}</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search classes..." className="w-[250px] pl-8" />
          </div>
          <Button onClick={() => window.location.href = '/calendar'}>
            <Calendar className="mr-2 h-4 w-4" />
            View Calendar
          </Button>
        </div>
      </div>

      <Tabs defaultValue="ongoing">
        <TabsList className="mb-6">
          <TabsTrigger value="ongoing">Ongoing ({classes?.ongoing.length || 0})</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming ({classes?.upcoming.length || 0})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({classes?.completed.length || 0})</TabsTrigger>
          <TabsTrigger value="all">All Classes</TabsTrigger>
        </TabsList>

        <TabsContent value="ongoing" className="m-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes?.ongoing.map((cls) => (
              <OngoingClassCard 
                key={cls.id} 
                {...cls} 
                onViewDetails={() => {
                  setSelectedClassId(cls.id);
                  setDetailsOpen(true);
                }}
              />
            ))}
            {classes?.ongoing.length === 0 && (
              <div className="col-span-full text-center py-8 text-muted-foreground">
                No ongoing classes at the moment
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="upcoming" className="m-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes?.upcoming.map((cls) => (
              <UpcomingClassCard 
                key={cls.id} 
                {...cls}
                onViewDetails={() => {
                  setSelectedClassId(cls.id);
                  setDetailsOpen(true);
                }}
              />
            ))}
            {classes?.upcoming.length === 0 && (
              <div className="col-span-full text-center py-8 text-muted-foreground">
                No upcoming classes for today
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="m-0">
          <CompletedClassesTable 
            classes={classes?.completed || []} 
            onViewDetails={(id) => {
              setSelectedClassId(id);
              setDetailsOpen(true);
            }}
          />
        </TabsContent>

        <TabsContent value="all" className="m-0">
          <AllClassesTable 
            classes={[
              ...(classes?.completed || []),
              ...(classes?.ongoing || []),
              ...(classes?.upcoming || [])
            ]}
            onViewDetails={(id) => {
              setSelectedClassId(id);
              setDetailsOpen(true);
            }}
            onViewReport={(id) => {
              setSelectedClassId(id);
              setReportOpen(true);
            }}
          />
        </TabsContent>
      </Tabs>

      {selectedClassId && (
        <>
          <ClassDetailsDialog
            classId={selectedClassId}
            open={detailsOpen}
            onOpenChange={setDetailsOpen}
          />
          <ClassReportDialog
            classId={selectedClassId}
            open={reportOpen}
            onOpenChange={setReportOpen}
          />
        </>
      )}
    </div>
  )
}

interface OngoingClassCardProps extends TimetableClass {
  onViewDetails: () => void;
}

function OngoingClassCard({
  title,
  code,
  time,
  location,
  instructor,
  attendanceRate,
  studentsPresent,
  totalStudents,
  status,
  onViewDetails,
}: OngoingClassCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <Badge className="mb-2 bg-green-500 hover:bg-green-600">{status}</Badge>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{code}</CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onViewDetails}>View Details</DropdownMenuItem>
              <DropdownMenuItem>View Attendance</DropdownMenuItem>
              <DropdownMenuItem>Send Notification</DropdownMenuItem>
              <DropdownMenuItem>End Class</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
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

          <div className="pt-2">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Attendance</span>
              <span className="text-sm font-medium">{attendanceRate}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-teal-600 h-2.5 rounded-full" style={{ width: `${attendanceRate}%` }}></div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {studentsPresent} of {totalStudents} students present
            </p>
          </div>

          <div className="flex space-x-2 pt-2">
            <Button className="flex-1" onClick={onViewDetails}>
              <Users className="mr-2 h-4 w-4" />
              Students
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface UpcomingClassCardProps extends TimetableClass {
  onViewDetails: () => void;
}

function UpcomingClassCard({
  title,
  code,
  time,
  location,
  instructor,
  totalStudents,
  startingIn,
  onViewDetails,
}: UpcomingClassCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <Badge variant="outline" className="mb-2">
              Starting {startingIn}
            </Badge>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{code}</CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onViewDetails}>View Details</DropdownMenuItem>
              <DropdownMenuItem>Prepare Attendance</DropdownMenuItem>
              <DropdownMenuItem>Send Notification</DropdownMenuItem>
              <DropdownMenuItem>Reschedule</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
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

          <div className="flex space-x-2 pt-2">
            <Button className="flex-1" onClick={onViewDetails}>
              <BookOpen className="mr-2 h-4 w-4" />
              Class Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface CompletedClassesTableProps {
  classes: TimetableClass[];
  onViewDetails: (id: string) => void;
}

function CompletedClassesTable({ classes, onViewDetails }: CompletedClassesTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Completed Classes</CardTitle>
        <CardDescription>Classes that have been completed today</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium">Class</th>
                <th className="text-left py-3 px-4 font-medium">Time</th>
                <th className="text-left py-3 px-4 font-medium">Instructor</th>
                <th className="text-left py-3 px-4 font-medium">Attendance</th>
                <th className="text-left py-3 px-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((cls) => (
                <tr key={cls.id} className="border-b">
                  <td className="py-3 px-4">
                    <div className="font-medium">{cls.title}</div>
                    <div className="text-xs text-muted-foreground">{cls.code}</div>
                  </td>
                  <td className="py-3 px-4">{cls.time}</td>
                  <td className="py-3 px-4">{cls.instructor}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-full max-w-[100px] bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-teal-600 h-2 rounded-full"
                          style={{ width: `${cls.attendanceRate}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium">
                        {cls.attendanceRate}% ({cls.studentsPresent}/{cls.totalStudents})
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Button variant="outline" size="sm" onClick={() => onViewDetails(cls.id)}>
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
              {classes.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-muted-foreground">
                    No completed classes for today
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

interface AllClassesTableProps {
  classes: TimetableClass[];
  onViewDetails: (id: string) => void;
  onViewReport: (id: string) => void;
}

function AllClassesTable({ classes, onViewDetails, onViewReport }: AllClassesTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>All Classes</CardTitle>
        <CardDescription>Complete schedule for today</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium">Class</th>
                <th className="text-left py-3 px-4 font-medium">Time</th>
                <th className="text-left py-3 px-4 font-medium">Instructor</th>
                <th className="text-left py-3 px-4 font-medium">Status</th>
                <th className="text-left py-3 px-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((cls) => (
                <tr key={cls.id} className="border-b">
                  <td className="py-3 px-4">
                    <div className="font-medium">{cls.title}</div>
                    <div className="text-xs text-muted-foreground">{cls.code}</div>
                  </td>
                  <td className="py-3 px-4">{cls.time}</td>
                  <td className="py-3 px-4">{cls.instructor}</td>
                  <td className="py-3 px-4">
                    <Badge
                      className={
                        cls.status === "Completed"
                          ? "bg-gray-500"
                          : cls.status === "In Progress"
                            ? "bg-green-500"
                            : "bg-blue-500"
                      }
                    >
                      {cls.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 space-x-2">
                    <Button variant="outline" size="sm" onClick={() => onViewDetails(cls.id)}>
                      View Details
                    </Button>
                    {cls.status === "Completed" && (
                      <Button variant="outline" size="sm" onClick={() => onViewReport(cls.id)}>
                        View Report
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
              {classes.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-muted-foreground">
                    No classes scheduled for today
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
