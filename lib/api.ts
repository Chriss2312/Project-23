// API base URL from environment variable
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// API endpoints
export const API_ENDPOINTS = {
  // Dashboard endpoints
  stats: `${API_BASE_URL}/dashboard/stats`,
  liveFeed: `${API_BASE_URL}/dashboard/live-feed`,
  departmentAttendance: `${API_BASE_URL}/dashboard/department-attendance`,
  recentAttendance: `${API_BASE_URL}/dashboard/recent-attendance`,

  // Department endpoints
  departments: `${API_BASE_URL}/departments`,

  // Student endpoints
  studentStats: (department?: string, attendance?: 'low' | 'perfect' | 'all') => {
    const params = new URLSearchParams();
    if (department) params.append('department', department);
    if (attendance) params.append('attendance', attendance);
    return `${API_BASE_URL}/students/stats?${params.toString()}`;
  },
  studentSearch: (query: string) => `${API_BASE_URL}/students/search?q=${encodeURIComponent(query)}`,
  studentDetails: (id: string) => `${API_BASE_URL}/students/${id}`,
  studentAttendance: (id: string) => `${API_BASE_URL}/students/${id}/attendance`,
  studentNotify: (id: string) => `${API_BASE_URL}/students/${id}/notify`,
  studentMarkAbsent: (id: string) => `${API_BASE_URL}/students/${id}/mark-absent`,

  // Timetable endpoints
  todayClasses: `${API_BASE_URL}/timetables/today`,
  weeklyClasses: `${API_BASE_URL}/timetables/week`,
  classDetails: (id: string) => `${API_BASE_URL}/timetables/${id}/details`,
  classReport: (id: string) => `${API_BASE_URL}/timetables/${id}/report`,
  staffTimetables: `${API_BASE_URL}/staff/timetables`,
  filteredTimetables: (departmentId?: string, dayOfWeek?: number) => {
    const params = new URLSearchParams();
    if (departmentId) params.append('department_id', departmentId);
    if (dayOfWeek !== undefined) params.append('day_of_week', dayOfWeek.toString());
    return `${API_BASE_URL}/timetables/filter?${params.toString()}`;
  },

  // Staff endpoints
  createTimetable: `${API_BASE_URL}/staff/timetables`,
  updateTimetable: (id: string) => `${API_BASE_URL}/staff/timetables/${id}`,
  deleteTimetable: (id: string) => `${API_BASE_URL}/staff/timetables/${id}`,

  // Scanner endpoints
  scannerStats: `${API_BASE_URL}/scanner/stats`,
  currentClassAttendance: (classId: string) => 
    `${API_BASE_URL}/scanner/attendance/${classId}`,
  markAttendance: `${API_BASE_URL}/scanner/mark-attendance`,
  lastScan: `${API_BASE_URL}/scanner/last-scan`,

  // Analytics endpoints
  getAnalyticsOverview: async (period: 'week' | 'month' | 'semester' | 'year'): Promise<AnalyticsOverview> => {
    const response = await fetch(`${API_BASE_URL}/analytics/overview?period=${period}`);
    if (!response.ok) throw new Error('Failed to fetch overview stats');
    return response.json();
  },
  
  getAttendanceByDay: async (): Promise<DayAttendance[]> => {
    const response = await fetch(`${API_BASE_URL}/analytics/attendance-by-day`);
    if (!response.ok) throw new Error('Failed to fetch day stats');
    return response.json();
  },
  
  getAttendanceByTime: async (): Promise<TimeAttendance[]> => {
    const response = await fetch(`${API_BASE_URL}/analytics/attendance-by-time`);
    if (!response.ok) throw new Error('Failed to fetch time stats');
    return response.json();
  },
  
  getMonthlyTrend: async (): Promise<MonthlyTrend[]> => {
    const response = await fetch(`${API_BASE_URL}/analytics/monthly-trend`);
    if (!response.ok) throw new Error('Failed to fetch monthly trend');
    return response.json();
  },
  
  getDepartmentStats: async (): Promise<DepartmentStats[]> => {
    const response = await fetch(`${API_BASE_URL}/analytics/department-stats`);
    if (!response.ok) throw new Error('Failed to fetch department stats');
    return response.json();
  },
  
  getStudentStats: async (): Promise<StudentStats> => {
    const response = await fetch(`${API_BASE_URL}/analytics/student-stats`);
    if (!response.ok) throw new Error('Failed to fetch student stats');
    return response.json();
  },
} as const;

// Types for student responses
export interface Student {
  id: string;
  student_id: string;
  name: string;
  email: string;
  department?: string;
  attendance_rate: number;
  classes_attended: number;
  total_classes: number;
  last_attendance?: string;
  status: 'At Risk' | 'Good' | 'Excellent';
}

export interface StudentStats {
  summary: {
    total_students: number;
    low_attendance_count: number;
    perfect_attendance_count: number;
  };
  departments: string[];
  students: Student[];
}

// Types for timetable responses
export interface Timetable {
  id: string;
  subject: string;
  instructor_name: string;
  subject_code: string;
  department_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  room: string;
  is_active: boolean;
  semester: string | null;
  academic_year: string | null;
  tolerance_minutes: number;
  timezone: string;
}

export interface NewTimetable {
  subject: string;
  subject_code: string;
  instructor_name: string;
  department_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  room: string;
  tolerance_minutes: number;
  semester?: string;
  academic_year?: string;
  timezone?: string;
}

export interface Department {
  id: string;
  name: string;
}

export interface ScannerStats {
  total_scans_today: number;
  current_class?: {
    id: string;
    subject: string;
    subject_code: string;
    start_time: string;
    end_time: string;
    total_students: number;
    present_students: number;
  };
  last_scan?: {
    student_name: string;
    student_id: string;
    timestamp: string;
  };
}

export interface AttendanceRecord {
  id: string;
  student_name: string;
  student_id: string;
  time_in: string;
  status: 'present' | 'absent' | 'late';
}

export interface AnalyticsOverview {
  overall_attendance_rate: number;
  attendance_rate_change: number;
  total_classes: number;
  total_classes_change: number;
  students_below_threshold: number;
  students_below_threshold_change: number;
}

export interface DayAttendance {
  day: string;
  attendance_rate: number;
}

export interface TimeAttendance {
  time_range: string;
  attendance_rate: number;
}

export interface MonthlyTrend {
  month: string;
  attendance_rate: number;
}

export interface DepartmentStats {
  name: string;
  attendance_rate: number;
  trend: 'up' | 'down' | 'stable';
  total_classes: number;
  total_students: number;
  at_risk_students: number;
}

export interface StudentDistribution {
  range: string;
  count: number;
}

export interface TopStudent {
  name: string;
  id: string;
  department: string;
  year: string;
  attendance_rate: number;
  consecutive_days: number;
}

export interface StudentStats {
  distribution: StudentDistribution[];
  top_students: TopStudent[];
}

export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(endpoint, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  return response.json();
} 