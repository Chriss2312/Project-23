'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { API_ENDPOINTS, AnalyticsOverview, DayAttendance, TimeAttendance, MonthlyTrend, DepartmentStats, StudentStats } from '@/lib/api';
import { ArrowDown, ArrowUp, Minus } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<'week' | 'month' | 'semester' | 'year'>('semester');
  const [overview, setOverview] = useState<AnalyticsOverview | null>(null);
  const [dayStats, setDayStats] = useState<DayAttendance[] | null>(null);
  const [timeStats, setTimeStats] = useState<TimeAttendance[] | null>(null);
  const [monthlyTrend, setMonthlyTrend] = useState<MonthlyTrend[] | null>(null);
  const [departmentStats, setDepartmentStats] = useState<DepartmentStats[] | null>(null);
  const [studentStats, setStudentStats] = useState<StudentStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [
          overviewData,
          dayData,
          timeData,
          trendData,
          deptData,
          studData
        ] = await Promise.all([
          API_ENDPOINTS.getAnalyticsOverview(period),
          API_ENDPOINTS.getAttendanceByDay(),
          API_ENDPOINTS.getAttendanceByTime(),
          API_ENDPOINTS.getMonthlyTrend(),
          API_ENDPOINTS.getDepartmentStats(),
          API_ENDPOINTS.getStudentStats()
        ]);

        setOverview(overviewData);
        setDayStats(dayData);
        setTimeStats(timeData);
        setMonthlyTrend(trendData);
        setDepartmentStats(deptData);
        setStudentStats(studData);
      } catch (err) {
        setError('Failed to fetch analytics data. Please try again later.');
        console.error('Error fetching analytics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [period]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-y-auto p-6 space-y-6 pb-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <Select value={period} onValueChange={(value: any) => setPeriod(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="semester">This Semester</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Attendance Rate</CardTitle>
            {overview && (
              <div className="flex items-center space-x-1">
                {overview.attendance_rate_change > 0 ? (
                  <ArrowUp className="text-green-500" />
                ) : overview.attendance_rate_change < 0 ? (
                  <ArrowDown className="text-red-500" />
                ) : (
                  <Minus className="text-gray-500" />
                )}
                <span className={overview.attendance_rate_change > 0 ? 'text-green-500' : 'text-red-500'}>
                  {Math.abs(overview.attendance_rate_change)}%
                </span>
              </div>
            )}
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-[100px]" />
            ) : (
              <div className="text-2xl font-bold">{overview?.overall_attendance_rate}%</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
            {overview && (
              <div className="flex items-center space-x-1">
                {overview.total_classes_change > 0 ? (
                  <ArrowUp className="text-green-500" />
                ) : overview.total_classes_change < 0 ? (
                  <ArrowDown className="text-red-500" />
                ) : (
                  <Minus className="text-gray-500" />
                )}
                <span className={overview.total_classes_change > 0 ? 'text-green-500' : 'text-red-500'}>
                  {Math.abs(overview.total_classes_change)}
                </span>
              </div>
            )}
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-[100px]" />
            ) : (
              <div className="text-2xl font-bold">{overview?.total_classes}</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Students Below Threshold</CardTitle>
            {overview && (
              <div className="flex items-center space-x-1">
                {overview.students_below_threshold_change > 0 ? (
                  <ArrowUp className="text-red-500" />
                ) : overview.students_below_threshold_change < 0 ? (
                  <ArrowDown className="text-green-500" />
                ) : (
                  <Minus className="text-gray-500" />
                )}
                <span className={overview.students_below_threshold_change > 0 ? 'text-red-500' : 'text-green-500'}>
                  {Math.abs(overview.students_below_threshold_change)}
                </span>
              </div>
            )}
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-[100px]" />
            ) : (
              <div className="text-2xl font-bold">{overview?.students_below_threshold}</div>
            )}
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="attendance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="attendance">Attendance Patterns</TabsTrigger>
          <TabsTrigger value="departments">Department Analysis</TabsTrigger>
          <TabsTrigger value="students">Student Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="attendance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Daily Attendance Pattern</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                {loading ? (
                  <Skeleton className="w-full h-full" />
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dayStats || []}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="attendance_rate" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Attendance by Time of Day</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                {loading ? (
                  <Skeleton className="w-full h-full" />
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={timeStats || []}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time_range" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="attendance_rate" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Monthly Attendance Trend</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                {loading ? (
                  <Skeleton className="w-full h-full" />
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyTrend || []}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="attendance_rate" stroke="#3b82f6" />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="departments">
          <Card>
            <CardHeader>
              <CardTitle>Department Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Department</TableHead>
                      <TableHead>Attendance Rate</TableHead>
                      <TableHead>Trend</TableHead>
                      <TableHead>Total Classes</TableHead>
                      <TableHead>Total Students</TableHead>
                      <TableHead>At Risk Students</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      Array(5).fill(0).map((_, i) => (
                        <TableRow key={i}>
                          {Array(6).fill(0).map((_, j) => (
                            <TableCell key={j}>
                              <Skeleton className="h-4 w-[100px]" />
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      departmentStats?.map((dept) => (
                        <TableRow key={dept.name}>
                          <TableCell>{dept.name}</TableCell>
                          <TableCell>{dept.attendance_rate}%</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              {dept.trend === 'up' ? (
                                <ArrowUp className="text-green-500 mr-1" />
                              ) : dept.trend === 'down' ? (
                                <ArrowDown className="text-red-500 mr-1" />
                              ) : (
                                <Minus className="text-gray-500 mr-1" />
                              )}
                              {dept.trend}
                            </div>
                          </TableCell>
                          <TableCell>{dept.total_classes}</TableCell>
                          <TableCell>{dept.total_students}</TableCell>
                          <TableCell>{dept.at_risk_students}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Distribution</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              {loading ? (
                <Skeleton className="w-full h-full" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={studentStats?.distribution || []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="range" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Performing Students</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead>Attendance Rate</TableHead>
                    <TableHead>Consecutive Days</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    Array(5).fill(0).map((_, i) => (
                      <TableRow key={i}>
                        {Array(6).fill(0).map((_, j) => (
                          <TableCell key={j}>
                            <Skeleton className="h-4 w-[100px]" />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    studentStats?.top_students.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.id}</TableCell>
                        <TableCell>{student.department}</TableCell>
                        <TableCell>{student.year}</TableCell>
                        <TableCell>{student.attendance_rate}%</TableCell>
                        <TableCell>{student.consecutive_days} days</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
