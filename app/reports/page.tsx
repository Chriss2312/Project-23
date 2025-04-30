import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  Check,
  ChevronDown,
  Download,
  FileText,
  Filter,
  Printer,
  Search,
  Share2,
  Users,
  Plus,
  BookOpen,
  AlertCircle,
  BarChart3,
  Settings,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function ReportsPage() {
  return (
    <div className="w-full h-full p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Reports</h1>
          <p className="text-muted-foreground">Generate and export attendance reports</p>
        </div>
        <div className="flex items-center space-x-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <FileText className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Generate New Report</DialogTitle>
                <DialogDescription>Configure the parameters for your attendance report.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="report-name" className="text-right">
                    Report Name
                  </Label>
                  <Input id="report-name" placeholder="April 2025 Attendance Report" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="report-type" className="text-right">
                    Report Type
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student Attendance</SelectItem>
                      <SelectItem value="class">Class Attendance</SelectItem>
                      <SelectItem value="department">Department Summary</SelectItem>
                      <SelectItem value="low">Low Attendance Report</SelectItem>
                      <SelectItem value="summary">Overall Summary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date-range" className="text-right">
                    Date Range
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select date range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                      <SelectItem value="semester">This Semester</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="format" className="text-right">
                    Format
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF Document</SelectItem>
                      <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                      <SelectItem value="csv">CSV File</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Options</Label>
                  <div className="col-span-3 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="include-charts" />
                      <label
                        htmlFor="include-charts"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Include charts and graphs
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="include-summary" />
                      <label
                        htmlFor="include-summary"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Include executive summary
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="include-recommendations" />
                      <label
                        htmlFor="include-recommendations"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Include recommendations
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Generate Report</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search reports by name, type, or date..." className="pl-8 w-full" />
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="flex items-center">
            <Filter className="mr-2 h-4 w-4" />
            Filters
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Report Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Report Types</SelectItem>
              <SelectItem value="student">Student Attendance</SelectItem>
              <SelectItem value="class">Class Attendance</SelectItem>
              <SelectItem value="department">Department Summary</SelectItem>
              <SelectItem value="low">Low Attendance Report</SelectItem>
              <SelectItem value="summary">Overall Summary</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="All Time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="semester">This Semester</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="recent">
        <TabsList className="mb-6">
          <TabsTrigger value="recent">Recent Reports</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
          <TabsTrigger value="templates">Report Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="m-0">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Reports</CardTitle>
                <CardDescription>Reports generated in the last 30 days</CardDescription>
              </div>
              <Button variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                View Archive
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Report Name</th>
                      <th className="text-left py-3 px-4 font-medium">Type</th>
                      <th className="text-left py-3 px-4 font-medium">Date Generated</th>
                      <th className="text-left py-3 px-4 font-medium">Created By</th>
                      <th className="text-left py-3 px-4 font-medium">Format</th>
                      <th className="text-left py-3 px-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        name: "April 2025 Attendance Summary",
                        type: "Overall Summary",
                        date: "Apr 28, 2025",
                        creator: "Admin",
                        format: "PDF",
                      },
                      {
                        name: "Computer Science Department Report",
                        type: "Department Summary",
                        date: "Apr 25, 2025",
                        creator: "Dr. Sarah Johnson",
                        format: "Excel",
                      },
                      {
                        name: "Low Attendance Students - April",
                        type: "Low Attendance Report",
                        date: "Apr 22, 2025",
                        creator: "Admin",
                        format: "PDF",
                      },
                      {
                        name: "Database Systems Class Attendance",
                        type: "Class Attendance",
                        date: "Apr 20, 2025",
                        creator: "Dr. Sarah Johnson",
                        format: "PDF",
                      },
                      {
                        name: "Student Attendance - John Smith",
                        type: "Student Attendance",
                        date: "Apr 15, 2025",
                        creator: "Prof. Michael Chen",
                        format: "PDF",
                      },
                    ].map((report, i) => (
                      <tr key={i} className="border-b">
                        <td className="py-3 px-4 font-medium">{report.name}</td>
                        <td className="py-3 px-4">{report.type}</td>
                        <td className="py-3 px-4">{report.date}</td>
                        <td className="py-3 px-4">{report.creator}</td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {report.format}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="icon" title="Download">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" title="Print">
                              <Printer className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" title="Share">
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled" className="m-0">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Scheduled Reports</CardTitle>
                <CardDescription>Automatically generated reports</CardDescription>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Schedule New Report
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Report Name</th>
                      <th className="text-left py-3 px-4 font-medium">Type</th>
                      <th className="text-left py-3 px-4 font-medium">Frequency</th>
                      <th className="text-left py-3 px-4 font-medium">Next Run</th>
                      <th className="text-left py-3 px-4 font-medium">Recipients</th>
                      <th className="text-left py-3 px-4 font-medium">Status</th>
                      <th className="text-left py-3 px-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        name: "Weekly Attendance Summary",
                        type: "Overall Summary",
                        frequency: "Weekly",
                        nextRun: "May 5, 2025",
                        recipients: "Admin Team",
                        status: "Active",
                      },
                      {
                        name: "Monthly Department Reports",
                        type: "Department Summary",
                        frequency: "Monthly",
                        nextRun: "May 1, 2025",
                        recipients: "Department Heads",
                        status: "Active",
                      },
                      {
                        name: "Low Attendance Alert",
                        type: "Low Attendance Report",
                        frequency: "Weekly",
                        nextRun: "May 5, 2025",
                        recipients: "Student Advisors",
                        status: "Active",
                      },
                    ].map((report, i) => (
                      <tr key={i} className="border-b">
                        <td className="py-3 px-4 font-medium">{report.name}</td>
                        <td className="py-3 px-4">{report.type}</td>
                        <td className="py-3 px-4">{report.frequency}</td>
                        <td className="py-3 px-4">{report.nextRun}</td>
                        <td className="py-3 px-4">{report.recipients}</td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <Check className="mr-1 h-3 w-3" />
                            {report.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <Button variant="outline" size="sm">
                            Edit Schedule
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="m-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Student Attendance Report",
                description: "Detailed attendance report for individual students",
                icon: Users,
              },
              {
                name: "Class Attendance Summary",
                description: "Summary of attendance for a specific class",
                icon: BookOpen,
              },
              {
                name: "Department Overview",
                description: "Attendance statistics by department",
                icon: FileText,
              },
              {
                name: "Low Attendance Alert",
                description: "Report of students with attendance below threshold",
                icon: AlertCircle,
              },
              {
                name: "Monthly Summary",
                description: "Monthly attendance summary with trends",
                icon: BarChart3,
              },
              {
                name: "Custom Report",
                description: "Create a fully customized report",
                icon: Settings,
              },
            ].map((template, i) => (
              <Card key={i} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 rounded-md bg-teal-100 text-teal-700">
                      <template.icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                  </div>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Use Template</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
