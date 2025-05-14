'use client';

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, CheckCircle2, FingerprintIcon as FingerPrint, RefreshCw, UserCheck, Users } from "lucide-react"
import { API_ENDPOINTS, AttendanceRecord, ScannerStats, fetchApi } from "@/lib/api"
import { useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"

export default function ScannerPage() {
  const [stats, setStats] = useState<ScannerStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([])
  const { toast } = useToast()

  const fetchStats = async () => {
    try {
      const data = await fetchApi<ScannerStats>(API_ENDPOINTS.scannerStats)
      setStats(data)
      if (data.current_class) {
        fetchAttendanceRecords(data.current_class.id)
      }
    } catch (err) {
      console.error('Failed to fetch scanner stats:', err)
      setError('Failed to load scanner statistics')
    } finally {
      setLoading(false)
    }
  }

  const fetchAttendanceRecords = async (classId: string) => {
    try {
      const data = await fetchApi<AttendanceRecord[]>(API_ENDPOINTS.currentClassAttendance(classId))
      setAttendanceRecords(data)
    } catch (err) {
      console.error('Failed to fetch attendance records:', err)
      toast({
        title: "Error",
        description: "Failed to load attendance records",
        variant: "destructive",
      })
    }
  }

  const handleRefresh = () => {
    setLoading(true)
    fetchStats()
  }

  useEffect(() => {
    fetchStats()
    // Set up polling for updates
    const interval = setInterval(fetchStats, 30000) // Poll every 30 seconds
    return () => clearInterval(interval)
  }, [])

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

  const presentStudents = attendanceRecords.filter(record => record.status === 'present' || record.status === 'late')
  const absentStudents = attendanceRecords.filter(record => record.status === 'absent')

  return (
    <div className="w-full h-full p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Fingerprint Scanner</h1>
          <p className="text-muted-foreground">Mark attendance using biometric verification</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-3 py-1 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Scanner Connected</span>
          </div>
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Scans Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.total_scans_today || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">Across all classes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Current Class</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.current_class?.subject_code || 'No Active Class'}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats?.current_class 
                ? `${stats.current_class.subject} (${stats.current_class.start_time} - ${stats.current_class.end_time})`
                : 'Waiting for next class'}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Attendance Rate</CardTitle>
          </CardHeader>
          <CardContent>
            {stats?.current_class && (
              <>
                <div className="text-3xl font-bold text-teal-600">
                  {((stats.current_class.present_students / stats.current_class.total_students) * 100).toFixed(1)}%
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stats.current_class.present_students}/{stats.current_class.total_students} students present
                </p>
              </>
            )}
            {!stats?.current_class && (
              <>
                <div className="text-3xl font-bold">-</div>
                <p className="text-xs text-muted-foreground mt-1">No active class</p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Scanner Status</CardTitle>
              <CardDescription>Live fingerprint scanner feed</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center space-y-6">
              <div className="relative">
                <div className="w-48 h-48 bg-gray-100 dark:bg-gray-800 rounded-lg border-2 border-teal-500 flex items-center justify-center">
                  <FingerPrint className="h-24 w-24 text-teal-500" />
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium">
                  Ready to Scan
                </div>
              </div>

              <div className="w-full max-w-xs p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-center mb-2">
                  <p className="text-sm font-medium">Last Scan Result</p>
                </div>
                {stats?.last_scan ? (
                  <>
                    <div className="flex items-center justify-center space-x-2 text-green-600 dark:text-green-400">
                      <CheckCircle2 className="h-5 w-5" />
                      <span className="font-medium">Successfully Verified</span>
                    </div>
                    <div className="mt-2 text-center text-sm text-muted-foreground">
                      {stats.last_scan.student_name} ({stats.last_scan.student_id})
                    </div>
                  </>
                ) : (
                  <div className="text-center text-sm text-muted-foreground">
                    No recent scans
                  </div>
                )}
              </div>

              <Button className="w-full">
                <FingerPrint className="mr-2 h-4 w-4" />
                Manual Scan
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Attendance Tracking</CardTitle>
              <CardDescription>
                {stats?.current_class 
                  ? `Current class: ${stats.current_class.subject} (${stats.current_class.subject_code})`
                  : 'No active class'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="present">
                <TabsList className="mb-4">
                  <TabsTrigger value="present" className="flex items-center">
                    <UserCheck className="mr-2 h-4 w-4" />
                    Present ({presentStudents.length})
                  </TabsTrigger>
                  <TabsTrigger value="absent" className="flex items-center">
                    <AlertCircle className="mr-2 h-4 w-4" />
                    Absent ({absentStudents.length})
                  </TabsTrigger>
                  <TabsTrigger value="all" className="flex items-center">
                    <Users className="mr-2 h-4 w-4" />
                    All Students
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="present" className="m-0">
                  <div className="overflow-y-auto max-h-[400px]">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium">Student</th>
                          <th className="text-left py-3 px-4 font-medium">ID</th>
                          <th className="text-left py-3 px-4 font-medium">Time</th>
                          <th className="text-left py-3 px-4 font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {presentStudents.map((record) => (
                          <tr key={record.id} className="border-b">
                            <td className="py-3 px-4">{record.student_name}</td>
                            <td className="py-3 px-4">{record.student_id}</td>
                            <td className="py-3 px-4">{record.time_in}</td>
                            <td className="py-3 px-4">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                record.status === 'late' 
                                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                  : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              }`}>
                                {record.status === 'late' ? 'Late' : 'Present'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>

                <TabsContent value="absent" className="m-0">
                  <div className="overflow-y-auto max-h-[400px]">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium">Student</th>
                          <th className="text-left py-3 px-4 font-medium">ID</th>
                          <th className="text-left py-3 px-4 font-medium">Status</th>
                          <th className="text-left py-3 px-4 font-medium">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {absentStudents.map((record) => (
                          <tr key={record.id} className="border-b">
                            <td className="py-3 px-4">{record.student_name}</td>
                            <td className="py-3 px-4">{record.student_id}</td>
                            <td className="py-3 px-4">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                                Absent
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <Button variant="outline" size="sm">
                                Mark Present
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>

                <TabsContent value="all" className="m-0">
                  <div className="overflow-y-auto max-h-[400px]">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium">Student</th>
                          <th className="text-left py-3 px-4 font-medium">ID</th>
                          <th className="text-left py-3 px-4 font-medium">Status</th>
                          <th className="text-left py-3 px-4 font-medium">Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {attendanceRecords.map((record) => (
                          <tr key={record.id} className="border-b">
                            <td className="py-3 px-4">{record.student_name}</td>
                            <td className="py-3 px-4">{record.student_id}</td>
                            <td className="py-3 px-4">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                record.status === 'present'
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                  : record.status === 'late'
                                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                              }`}>
                                {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                              </span>
                            </td>
                            <td className="py-3 px-4">{record.time_in || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
