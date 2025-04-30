import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Download,
  LineChart,
  PieChart,
  SlidersHorizontal,
  Users,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AnalyticsPage() {
  return (
    <div className="w-full h-full p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">Attendance statistics and insights</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select defaultValue="semester">
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
          <Button variant="outline">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Overall Attendance Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">85.7%</div>
            <div className="flex items-center mt-1 text-xs">
              <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500 font-medium">2.1%</span>
              <span className="text-muted-foreground ml-1">from last semester</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Classes Conducted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,248</div>
            <div className="flex items-center mt-1 text-xs">
              <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500 font-medium">124</span>
              <span className="text-muted-foreground ml-1">from last semester</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Students Below Threshold</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-500">42</div>
            <div className="flex items-center mt-1 text-xs">
              <ArrowDownRight className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500 font-medium">8</span>
              <span className="text-muted-foreground ml-1">from last semester</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-6">
          <TabsTrigger value="overview" className="flex items-center">
            <BarChart3 className="mr-2 h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="departments" className="flex items-center">
            <PieChart className="mr-2 h-4 w-4" />
            Departments
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center">
            <LineChart className="mr-2 h-4 w-4" />
            Trends
          </TabsTrigger>
          <TabsTrigger value="students" className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            Students
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="m-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Attendance by Day of Week</CardTitle>
                <CardDescription>Average attendance rate by weekday</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="h-full w-full flex items-end justify-between px-2">
                  {[
                    { day: "Mon", value: 88 },
                    { day: "Tue", value: 92 },
                    { day: "Wed", value: 85 },
                    { day: "Thu", value: 90 },
                    { day: "Fri", value: 78 },
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className="w-12 bg-teal-600 rounded-t-md" style={{ height: `${item.value * 0.7}%` }}></div>
                      <div className="mt-2 text-sm font-medium">{item.day}</div>
                      <div className="text-xs text-muted-foreground">{item.value}%</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Attendance by Time of Day</CardTitle>
                <CardDescription>Average attendance rate by class time</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="h-full w-full flex items-end justify-between px-2">
                  {[
                    { time: "8-10 AM", value: 92 },
                    { time: "10-12 PM", value: 88 },
                    { time: "12-2 PM", value: 75 },
                    { time: "2-4 PM", value: 82 },
                    { time: "4-6 PM", value: 70 },
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className="w-12 bg-teal-600 rounded-t-md" style={{ height: `${item.value * 0.7}%` }}></div>
                      <div className="mt-2 text-sm font-medium">{item.time}</div>
                      <div className="text-xs text-muted-foreground">{item.value}%</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Monthly Attendance Trend</CardTitle>
                <CardDescription>Attendance rate over the past 6 months</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="h-full w-full flex items-end space-x-2">
                  {[
                    { month: "Nov", value: 82 },
                    { month: "Dec", value: 78 },
                    { month: "Jan", value: 80 },
                    { month: "Feb", value: 84 },
                    { month: "Mar", value: 86 },
                    { month: "Apr", value: 88 },
                  ].map((item, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center">
                      <div className="w-full bg-teal-600 rounded-t-md" style={{ height: `${item.value * 0.7}%` }}></div>
                      <div className="mt-2 text-sm font-medium">{item.month}</div>
                      <div className="text-xs text-muted-foreground">{item.value}%</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="departments" className="m-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Attendance by Department</CardTitle>
                <CardDescription>Average attendance rate by department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Computer Science", attendance: 92 },
                    { name: "Electrical Engineering", attendance: 88 },
                    { name: "Mechanical Engineering", attendance: 85 },
                    { name: "Civil Engineering", attendance: 79 },
                    { name: "Business Administration", attendance: 72 },
                  ].map((dept, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{dept.name}</span>
                        <span className="text-sm font-medium">{dept.attendance}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div className="bg-teal-600 h-2.5 rounded-full" style={{ width: `${dept.attendance}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Department Comparison</CardTitle>
                <CardDescription>Attendance metrics across departments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center">
                  <div className="w-64 h-64 rounded-full border-8 border-gray-100 relative">
                    {[
                      { name: "CS", value: 92, color: "bg-teal-600", angle: 0, size: 35 },
                      { name: "EE", value: 88, color: "bg-blue-500", angle: 72, size: 30 },
                      { name: "ME", value: 85, color: "bg-indigo-500", angle: 144, size: 25 },
                      { name: "CE", value: 79, color: "bg-purple-500", angle: 216, size: 20 },
                      { name: "BA", value: 72, color: "bg-pink-500", angle: 288, size: 15 },
                    ].map((dept, i) => (
                      <div
                        key={i}
                        className={`absolute w-${dept.size} h-${dept.size} ${dept.color} rounded-full flex items-center justify-center text-white font-bold`}
                        style={{
                          top: `${50 - 35 * Math.sin((dept.angle * Math.PI) / 180)}%`,
                          left: `${50 + 35 * Math.cos((dept.angle * Math.PI) / 180)}%`,
                          width: `${dept.size}%`,
                          height: `${dept.size}%`,
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        {dept.name}
                      </div>
                    ))}
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <span className="text-3xl font-bold">85.7%</span>
                      <span className="text-sm text-muted-foreground">Overall</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Department Performance</CardTitle>
                <CardDescription>Attendance metrics and trends by department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">Department</th>
                        <th className="text-left py-3 px-4 font-medium">Avg. Attendance</th>
                        <th className="text-left py-3 px-4 font-medium">Trend</th>
                        <th className="text-left py-3 px-4 font-medium">Classes</th>
                        <th className="text-left py-3 px-4 font-medium">Students</th>
                        <th className="text-left py-3 px-4 font-medium">At Risk</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          name: "Computer Science",
                          attendance: 92,
                          trend: "up",
                          classes: 320,
                          students: 450,
                          atRisk: 8,
                        },
                        {
                          name: "Electrical Engineering",
                          attendance: 88,
                          trend: "up",
                          classes: 280,
                          students: 380,
                          atRisk: 12,
                        },
                        {
                          name: "Mechanical Engineering",
                          attendance: 85,
                          trend: "stable",
                          classes: 260,
                          students: 320,
                          atRisk: 15,
                        },
                        {
                          name: "Civil Engineering",
                          attendance: 79,
                          trend: "down",
                          classes: 240,
                          students: 290,
                          atRisk: 22,
                        },
                        {
                          name: "Business Administration",
                          attendance: 72,
                          trend: "down",
                          classes: 220,
                          students: 310,
                          atRisk: 35,
                        },
                      ].map((dept, i) => (
                        <tr key={i} className="border-b">
                          <td className="py-3 px-4 font-medium">{dept.name}</td>
                          <td className="py-3 px-4">{dept.attendance}%</td>
                          <td className="py-3 px-4">
                            {dept.trend === "up" ? (
                              <span className="flex items-center text-green-500">
                                <ArrowUpRight className="h-4 w-4 mr-1" />
                                Increasing
                              </span>
                            ) : dept.trend === "down" ? (
                              <span className="flex items-center text-red-500">
                                <ArrowDownRight className="h-4 w-4 mr-1" />
                                Decreasing
                              </span>
                            ) : (
                              <span className="flex items-center text-gray-500">Stable</span>
                            )}
                          </td>
                          <td className="py-3 px-4">{dept.classes}</td>
                          <td className="py-3 px-4">{dept.students}</td>
                          <td className="py-3 px-4">{dept.atRisk}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="m-0">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Trends Over Time</CardTitle>
                <CardDescription>Weekly attendance patterns for the current semester</CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                <div className="h-full w-full flex flex-col justify-between">
                  <div className="flex-1 flex items-end space-x-1">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center">
                        <div
                          className="w-full bg-teal-600 rounded-t-sm"
                          style={{
                            height: `${
                              75 + 15 * Math.sin(i / 3) + 5 * Math.sin(i) + (i > 8 ? 5 : 0) + (i > 12 ? 3 : 0)
                            }%`,
                          }}
                        ></div>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-4 mt-4 text-sm">
                    <div className="text-center font-medium">February</div>
                    <div className="text-center font-medium">March</div>
                    <div className="text-center font-medium">April</div>
                    <div className="text-center font-medium">May</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Attendance by Weather</CardTitle>
                  <CardDescription>Correlation between weather conditions and attendance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { condition: "Sunny", attendance: 92 },
                      { condition: "Cloudy", attendance: 88 },
                      { condition: "Rainy", attendance: 75 },
                      { condition: "Stormy", attendance: 65 },
                      { condition: "Snowy", attendance: 60 },
                    ].map((weather, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{weather.condition}</span>
                          <span className="text-sm font-medium">{weather.attendance}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                          <div
                            className="bg-teal-600 h-2.5 rounded-full"
                            style={{ width: `${weather.attendance}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Attendance by Class Size</CardTitle>
                  <CardDescription>Correlation between class size and attendance rate</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { size: "Small (< 20)", attendance: 95 },
                      { size: "Medium (20-40)", attendance: 88 },
                      { size: "Large (40-60)", attendance: 82 },
                      { size: "Very Large (60-80)", attendance: 75 },
                      { size: "Massive (80+)", attendance: 68 },
                    ].map((size, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{size.size}</span>
                          <span className="text-sm font-medium">{size.attendance}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                          <div
                            className="bg-teal-600 h-2.5 rounded-full"
                            style={{ width: `${size.attendance}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="students" className="m-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Distribution</CardTitle>
                <CardDescription>Student attendance rate distribution</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="h-full w-full flex items-end space-x-2">
                  {[
                    { range: "< 60%", count: 15, color: "bg-red-500" },
                    { range: "60-70%", count: 28, color: "bg-orange-500" },
                    { range: "70-80%", count: 42, color: "bg-yellow-500" },
                    { range: "80-90%", count: 65, color: "bg-teal-500" },
                    { range: "90-100%", count: 48, color: "bg-green-500" },
                  ].map((item, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center">
                      <div
                        className={`w-full ${item.color} rounded-t-md`}
                        style={{ height: `${(item.count / 65) * 100}%` }}
                      ></div>
                      <div className="mt-2 text-sm font-medium">{item.range}</div>
                      <div className="text-xs text-muted-foreground">{item.count} students</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Year-wise Attendance</CardTitle>
                <CardDescription>Average attendance by year of study</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="h-full w-full flex items-end space-x-2">
                  {[
                    { year: "1st Year", attendance: 90 },
                    { year: "2nd Year", attendance: 85 },
                    { year: "3rd Year", attendance: 82 },
                    { year: "4th Year", attendance: 78 },
                  ].map((item, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center">
                      <div
                        className="w-full bg-teal-600 rounded-t-md"
                        style={{ height: `${item.attendance * 0.8}%` }}
                      ></div>
                      <div className="mt-2 text-sm font-medium">{item.year}</div>
                      <div className="text-xs text-muted-foreground">{item.attendance}%</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Top Students by Attendance</CardTitle>
                <CardDescription>Students with highest attendance records</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">Student</th>
                        <th className="text-left py-3 px-4 font-medium">ID</th>
                        <th className="text-left py-3 px-4 font-medium">Department</th>
                        <th className="text-left py-3 px-4 font-medium">Year</th>
                        <th className="text-left py-3 px-4 font-medium">Attendance</th>
                        <th className="text-left py-3 px-4 font-medium">Consecutive Days</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          name: "Robert Lee",
                          id: "CS2023007",
                          department: "Civil Engineering",
                          year: "3rd Year",
                          attendance: 98,
                          consecutive: 75,
                        },
                        {
                          name: "Michael Brown",
                          id: "CS2023003",
                          department: "Electrical Engineering",
                          year: "2nd Year",
                          attendance: 95,
                          consecutive: 60,
                        },
                        {
                          name: "John Smith",
                          id: "CS2023001",
                          department: "Computer Science",
                          year: "1st Year",
                          attendance: 92,
                          consecutive: 45,
                        },
                        {
                          name: "Laura Williams",
                          id: "CS2023010",
                          department: "Business Administration",
                          year: "4th Year",
                          attendance: 90,
                          consecutive: 30,
                        },
                        {
                          name: "Emily Johnson",
                          id: "CS2023002",
                          department: "Computer Science",
                          year: "1st Year",
                          attendance: 88,
                          consecutive: 25,
                        },
                      ].map((student, i) => (
                        <tr key={i} className="border-b">
                          <td className="py-3 px-4 font-medium">{student.name}</td>
                          <td className="py-3 px-4">{student.id}</td>
                          <td className="py-3 px-4">{student.department}</td>
                          <td className="py-3 px-4">{student.year}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              <div className="w-full max-w-[100px] bg-gray-200 rounded-full h-2">
                                <div
                                  className="h-2 rounded-full bg-green-500"
                                  style={{ width: `${student.attendance}%` }}
                                ></div>
                              </div>
                              <span className="text-xs font-medium">{student.attendance}%</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">{student.consecutive} days</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
