import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Edit, Trash2, Mail } from 'lucide-react';
import Card, { CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Table, { type Column } from '../components/ui/Table';
import Modal from '../components/ui/Modal';
import type { Student } from '../types';
import { getInitials, formatDate } from '../lib/utils';

// Mock data
const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Ahmed Hassan',
    email: 'ahmed.hassan@example.com',
    studentId: 'ST2024001',
    course: 'Computer Science',
    grade: 'A',
    enrollmentDate: '2024-01-10T00:00:00Z',
  },
  {
    id: '2',
    name: 'Fatima Ali',
    email: 'fatima.ali@example.com',
    studentId: 'ST2024002',
    course: 'Software Engineering',
    grade: 'A+',
    enrollmentDate: '2024-01-10T00:00:00Z',
  },
  {
    id: '3',
    name: 'Mohammed Ibrahim',
    email: 'mohammed.ibrahim@example.com',
    studentId: 'ST2024003',
    course: 'Computer Science',
    grade: 'B+',
    enrollmentDate: '2024-01-11T00:00:00Z',
  },
  {
    id: '4',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    studentId: 'ST2024004',
    course: 'Data Science',
    grade: 'A',
    enrollmentDate: '2024-01-12T00:00:00Z',
  },
];

export default function Students() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRows, setSelectedRows] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showModal, setShowModal] = useState(false);

  const filteredStudents = mockStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns: Column<Student>[] = [
    {
      key: 'name',
      header: 'Student',
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
            {getInitials(row.name)}
          </div>
          <div>
            <p className="font-medium text-gray-900 dark:text-white">{row.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{row.studentId}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'email',
      header: 'Email',
      sortable: true,
      render: (row) => (
        <a
          href={`mailto:${row.email}`}
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          {row.email}
        </a>
      ),
    },
    {
      key: 'course',
      header: 'Course',
      sortable: true,
    },
    {
      key: 'grade',
      header: 'Grade',
      sortable: true,
      render: (row) => (
        <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-md text-sm font-medium">
          {row.grade}
        </span>
      ),
    },
    {
      key: 'enrollmentDate',
      header: 'Enrolled',
      sortable: true,
      render: (row) => <span className="text-sm">{formatDate(row.enrollmentDate)}</span>,
    },
    {
      key: 'id',
      header: 'Actions',
      render: (row) => (
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedStudent(row);
              setShowModal(true);
            }}
            className="p-1.5 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
            title="View Details"
          >
            <Edit size={16} className="text-blue-600 dark:text-blue-400" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (confirm(`Delete ${row.name}?`)) {
                console.log('Delete student:', row.id);
              }
            }}
            className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            title="Delete"
          >
            <Trash2 size={16} className="text-red-600 dark:text-red-400" />
          </button>
        </div>
      ),
    },
  ];

  const handleRowClick = (student: Student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Students</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage student information
          </p>
        </div>
        <Button variant="primary" icon={<Plus size={18} />}>
          Add Student
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Students', value: mockStudents.length },
          { label: 'Active Courses', value: new Set(mockStudents.map((s) => s.course)).size },
          { label: 'Average Grade', value: 'A-' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {stat.value}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <Input
            placeholder="Search students by name, email, or student ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search size={18} />}
          />
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Students ({filteredStudents.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table
            data={filteredStudents}
            columns={columns}
            selectable
            selectedRows={selectedRows}
            onSelectionChange={setSelectedRows}
            onRowClick={handleRowClick}
          />

          {selectedRows.length > 0 && (
            <div className="mt-4 flex items-center gap-3">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {selectedRows.length} student(s) selected
              </p>
              <Button variant="danger" size="sm">
                Delete Selected
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Student Details Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedStudent(null);
        }}
        title="Student Details"
        size="lg"
      >
        {selectedStudent && (
          <div className="space-y-6">
            {/* Profile Section */}
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                {getInitials(selectedStudent.name)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {selectedStudent.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{selectedStudent.studentId}</p>
              </div>
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                  <Mail size={16} />
                  Email
                </label>
                <p className="text-gray-900 dark:text-white mt-1">{selectedStudent.email}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">Course</label>
                <p className="text-gray-900 dark:text-white mt-1">{selectedStudent.course}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">Grade</label>
                <p className="text-gray-900 dark:text-white mt-1">{selectedStudent.grade}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">
                  Enrollment Date
                </label>
                <p className="text-gray-900 dark:text-white mt-1">
                  {formatDate(selectedStudent.enrollmentDate)}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button variant="primary" className="flex-1">
                Edit Student
              </Button>
              <Button variant="outline" className="flex-1">
                View Results
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
