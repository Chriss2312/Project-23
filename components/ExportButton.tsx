import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { Student } from "@/lib/api"

interface ExportButtonProps {
  students: Student[]
}

export function ExportButton({ students }: ExportButtonProps) {
  const handleExport = () => {
    // Define headers
    const headers = [
      'Name',
      'Student ID',
      'Department',
      'Attendance Rate',
      'Classes Attended',
      'Total Classes',
      'Status',
      'Last Attendance'
    ]

    // Prepare rows data
    const rows = students.map(student => [
      student.name,
      student.student_id,
      student.department || 'N/A',
      `${student.attendance_rate}%`,
      student.classes_attended,
      student.total_classes,
      student.status,
      student.last_attendance ? new Date(student.last_attendance).toLocaleDateString() : 'Never'
    ])

    // Convert to CSV string
    const csvContent = [
      headers.join(','),
      ...rows.map(row => 
        row.map(cell => {
          // Handle cells that might contain commas by wrapping in quotes
          const cellStr = String(cell).replace(/"/g, '""') // Escape quotes
          return cellStr.includes(',') ? `"${cellStr}"` : cellStr
        }).join(',')
      )
    ].join('\n')

    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    
    // Set download attributes
    link.setAttribute('href', url)
    link.setAttribute('download', `student-attendance-report-${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    
    // Trigger download and cleanup
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <Button variant="outline" onClick={handleExport}>
      <Download className="mr-2 h-4 w-4" />
      Export Report
    </Button>
  )
} 