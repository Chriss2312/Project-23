import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, CheckCircle2, FingerprintIcon as FingerPrint, RefreshCw, UserCheck, Users } from "lucide-react"

export default function ScannerPage() {
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
          <Button variant="outline" size="sm">
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
            <div className="text-3xl font-bold">247</div>
            <p className="text-xs text-muted-foreground mt-1">Across all classes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Current Class</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">CS401</div>
            <p className="text-xs text-muted-foreground mt-1">Database Systems (09:00 - 10:30)</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Attendance Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-teal-600">92%</div>
            <p className="text-xs text-muted-foreground mt-1">42/45 students present</p>
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
                <div className="flex items-center justify-center space-x-2 text-green-600 dark:text-green-400">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="font-medium">Successfully Verified</span>
                </div>
                <div className="mt-2 text-center text-sm text-muted-foreground">John Smith (CS2023001)</div>
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
              <CardDescription>Current class: Database Systems (CS401)</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="present">
                <TabsList className="mb-4">
                  <TabsTrigger value="present" className="flex items-center">
                    <UserCheck className="mr-2 h-4 w-4" />
                    Present (42)
                  </TabsTrigger>
                  <TabsTrigger value="absent" className="flex items-center">
                    <AlertCircle className="mr-2 h-4 w-4" />
                    Absent (3)
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
                        {Array.from({ length: 10 }).map((_, i) => (
                          <tr key={i} className="border-b">
                            <td className="py-3 px-4">Student Name {i + 1}</td>
                            <td className="py-3 px-4">CS2023{String(i + 1).padStart(3, "0")}</td>
                            <td className="py-3 px-4">{`09:${(i * 2 + 10).toString().padStart(2, "0")} AM`}</td>
                            <td className="py-3 px-4">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                Present
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
                        {Array.from({ length: 3 }).map((_, i) => (
                          <tr key={i} className="border-b">
                            <td className="py-3 px-4">Absent Student {i + 1}</td>
                            <td className="py-3 px-4">CS2023{String(i + 42).padStart(3, "0")}</td>
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
                        {Array.from({ length: 15 }).map((_, i) => (
                          <tr key={i} className="border-b">
                            <td className="py-3 px-4">Student {i + 1}</td>
                            <td className="py-3 px-4">CS2023{String(i + 1).padStart(3, "0")}</td>
                            <td className="py-3 px-4">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  i < 12
                                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                }`}
                              >
                                {i < 12 ? "Present" : "Absent"}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              {i < 12 ? `09:${(i * 2 + 10).toString().padStart(2, "0")} AM` : "-"}
                            </td>
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
