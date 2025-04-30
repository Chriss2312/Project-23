import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Battery, BookOpen, Calendar, Clock, FingerprintIcon as FingerPrint, Home, User } from "lucide-react"

export default function MobileAppPreview() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Mobile App Preview</h1>

      <div className="flex justify-center">
        <div className="w-full max-w-sm border-8 border-gray-800 rounded-[40px] overflow-hidden bg-white shadow-xl">
          {/* Phone Status Bar */}
          <div className="bg-gray-800 text-white px-5 py-2 flex justify-between items-center text-xs">
            <div>9:41</div>
            <div className="flex items-center space-x-1">
              <Battery className="h-3 w-3" />
              <span>85%</span>
            </div>
          </div>

          {/* App Content */}
          <div className="h-[600px] overflow-y-auto">
            {/* Home Screen */}
            <div className="p-4">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-lg font-bold">Hello, John</h2>
                  <p className="text-sm text-muted-foreground">Computer Science, Year 3</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="h-6 w-6 text-gray-600" />
                </div>
              </div>

              <Card className="mb-6">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Overall Attendance</CardTitle>
                  <CardDescription>Current semester</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="relative w-24 h-24">
                      <svg className="w-24 h-24" viewBox="0 0 100 100">
                        <circle
                          className="text-gray-200 stroke-current"
                          strokeWidth="10"
                          cx="50"
                          cy="50"
                          r="40"
                          fill="transparent"
                        ></circle>
                        <circle
                          className="text-teal-600 stroke-current"
                          strokeWidth="10"
                          strokeLinecap="round"
                          cx="50"
                          cy="50"
                          r="40"
                          fill="transparent"
                          strokeDasharray="251.2"
                          strokeDashoffset="50.24"
                          transform="rotate(-90 50 50)"
                        ></circle>
                        <text
                          x="50"
                          y="50"
                          dominantBaseline="middle"
                          textAnchor="middle"
                          className="text-2xl font-bold"
                          fill="currentColor"
                        >
                          80%
                        </text>
                      </svg>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Classes Attended</span>
                        <span className="text-sm font-medium">48/60</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Minimum Required</span>
                        <span className="text-sm font-medium">75%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Status</span>
                        <span className="text-sm font-medium text-green-600">Good</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <h3 className="text-lg font-medium mb-4">Today's Classes</h3>
              <div className="space-y-3 mb-6">
                {[
                  { id: 1, subject: "Database Systems", code: "CS401", time: "09:00 - 10:30", attended: true },
                  { id: 2, subject: "Software Engineering", code: "CS402", time: "11:00 - 12:30", attended: true },
                  { id: 3, subject: "Computer Networks", code: "CS403", time: "14:00 - 15:30", attended: false },
                ].map((cls) => (
                  <div key={cls.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="mr-3">
                      <div className={`w-3 h-3 rounded-full ${cls.attended ? "bg-green-500" : "bg-orange-500"}`}></div>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{cls.subject}</p>
                      <p className="text-xs text-muted-foreground">
                        {cls.code} • {cls.time}
                      </p>
                    </div>
                    <div className="text-sm">
                      {cls.attended ? (
                        <span className="text-green-600">Attended</span>
                      ) : (
                        <span className="text-orange-600">Upcoming</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-medium mb-4">Subject-wise Attendance</h3>
              <Tabs defaultValue="all">
                <TabsList className="mb-4 w-full">
                  <TabsTrigger value="all" className="flex-1">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="low" className="flex-1">
                    Low
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="m-0">
                  <div className="space-y-4">
                    {[
                      { subject: "Database Systems", code: "CS401", attendance: 85 },
                      { subject: "Software Engineering", code: "CS402", attendance: 92 },
                      { subject: "Computer Networks", code: "CS403", attendance: 78 },
                      { subject: "Operating Systems", code: "CS404", attendance: 65 },
                      { subject: "Web Development", code: "CS405", attendance: 88 },
                    ].map((subject) => (
                      <div key={subject.code} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{subject.subject}</span>
                          <span
                            className={`text-sm font-medium ${
                              subject.attendance < 75 ? "text-red-600" : "text-green-600"
                            }`}
                          >
                            {subject.attendance}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${subject.attendance < 75 ? "bg-red-500" : "bg-teal-600"}`}
                            style={{ width: `${subject.attendance}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="low" className="m-0">
                  <div className="space-y-4">
                    {[{ subject: "Operating Systems", code: "CS404", attendance: 65 }].map((subject) => (
                      <div key={subject.code} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{subject.subject}</span>
                          <span className="text-sm font-medium text-red-600">{subject.attendance}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full bg-red-500"
                            style={{ width: `${subject.attendance}%` }}
                          ></div>
                        </div>
                        <div className="bg-red-50 p-2 rounded text-xs text-red-600">
                          Warning: Below minimum attendance requirement (75%)
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Bottom Navigation */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-2">
              <div className="flex flex-col items-center text-teal-600">
                <Home className="h-5 w-5" />
                <span className="text-xs mt-1">Home</span>
              </div>
              <div className="flex flex-col items-center text-gray-500">
                <Calendar className="h-5 w-5" />
                <span className="text-xs mt-1">Classes</span>
              </div>
              <div className="flex flex-col items-center text-gray-500">
                <FingerPrint className="h-5 w-5" />
                <span className="text-xs mt-1">Scan</span>
              </div>
              <div className="flex flex-col items-center text-gray-500">
                <BarChart className="h-5 w-5" />
                <span className="text-xs mt-1">Reports</span>
              </div>
              <div className="flex flex-col items-center text-gray-500">
                <User className="h-5 w-5" />
                <span className="text-xs mt-1">Profile</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fingerprint Scan Screen */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Fingerprint Scan Screen</h2>
        <div className="flex justify-center">
          <div className="w-full max-w-sm border-8 border-gray-800 rounded-[40px] overflow-hidden bg-white shadow-xl">
            {/* Phone Status Bar */}
            <div className="bg-gray-800 text-white px-5 py-2 flex justify-between items-center text-xs">
              <div>9:41</div>
              <div className="flex items-center space-x-1">
                <Battery className="h-3 w-3" />
                <span>85%</span>
              </div>
            </div>

            {/* App Content */}
            <div className="h-[600px] bg-gradient-to-b from-teal-50 to-white flex flex-col items-center justify-center p-6 relative">
              <div className="absolute top-4 left-4">
                <button className="text-teal-600">
                  <Home className="h-6 w-6" />
                </button>
              </div>

              <h2 className="text-xl font-bold mb-2">Attendance Scanner</h2>
              <p className="text-sm text-center text-muted-foreground mb-8">
                Place your finger on the scanner to mark your attendance
              </p>

              <div className="relative mb-8">
                <div className="w-48 h-48 bg-white rounded-full border-4 border-teal-500 flex items-center justify-center shadow-lg">
                  <FingerPrint className="h-24 w-24 text-teal-500" />
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm font-medium">
                  Ready to Scan
                </div>

                {/* Animated rings */}
                <div className="absolute inset-0 w-48 h-48 border-4 border-teal-200 rounded-full animate-ping opacity-75"></div>
              </div>

              <div className="text-center mb-8">
                <h3 className="text-lg font-medium mb-1">Current Class</h3>
                <p className="text-sm font-medium">Computer Networks (CS403)</p>
                <p className="text-xs text-muted-foreground">14:00 - 15:30</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-md w-full">
                <div className="flex items-center space-x-3 mb-3">
                  <Clock className="h-5 w-5 text-teal-600" />
                  <div>
                    <p className="text-sm font-medium">Recent Activity</p>
                    <p className="text-xs text-muted-foreground">Today's attendance</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { subject: "Database Systems", code: "CS401", time: "09:15 AM", status: "Present" },
                    { subject: "Software Engineering", code: "CS402", time: "11:05 AM", status: "Present" },
                  ].map((record, i) => (
                    <div key={i} className="flex items-center p-2 bg-gray-50 rounded">
                      <div className="mr-3">
                        <BookOpen className="h-4 w-4 text-teal-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{record.subject}</p>
                        <p className="text-xs text-muted-foreground">
                          {record.code} • {record.time}
                        </p>
                      </div>
                      <div className="text-xs font-medium text-green-600">{record.status}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Navigation */}
              <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-2">
                <div className="flex flex-col items-center text-gray-500">
                  <Home className="h-5 w-5" />
                  <span className="text-xs mt-1">Home</span>
                </div>
                <div className="flex flex-col items-center text-gray-500">
                  <Calendar className="h-5 w-5" />
                  <span className="text-xs mt-1">Classes</span>
                </div>
                <div className="flex flex-col items-center text-teal-600">
                  <FingerPrint className="h-5 w-5" />
                  <span className="text-xs mt-1">Scan</span>
                </div>
                <div className="flex flex-col items-center text-gray-500">
                  <BarChart className="h-5 w-5" />
                  <span className="text-xs mt-1">Reports</span>
                </div>
                <div className="flex flex-col items-center text-gray-500">
                  <User className="h-5 w-5" />
                  <span className="text-xs mt-1">Profile</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
