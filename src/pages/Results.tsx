import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Download, Filter } from 'lucide-react';
import Card, { CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Table, { type Column } from '../components/ui/Table';
import type { Result } from '../types';
import { calculatePercentage, formatDate, getGradeColor } from '../lib/utils';

// Mock data
const mockResults: Result[] = [
  {
    id: '1',
    studentId: 's1',
    studentName: 'Ahmed Hassan',
    assignmentId: 'a1',
    assignmentTitle: 'Database Design Project',
    grade: 85,
    maxGrade: 100,
    submittedAt: '2024-01-15T10:30:00Z',
    gradedAt: '2024-01-17T14:00:00Z',
    feedback: 'Excellent work!',
  },
  {
    id: '2',
    studentId: 's2',
    studentName: 'Fatima Ali',
    assignmentId: 'a1',
    assignmentTitle: 'Database Design Project',
    grade: 92,
    maxGrade: 100,
    submittedAt: '2024-01-15T09:00:00Z',
    gradedAt: '2024-01-17T14:00:00Z',
    feedback: 'Outstanding performance!',
  },
  {
    id: '3',
    studentId: 's3',
    studentName: 'Mohammed Ibrahim',
    assignmentId: 'a2',
    assignmentTitle: 'Web Development Final',
    grade: 78,
    maxGrade: 100,
    submittedAt: '2024-01-16T11:00:00Z',
    gradedAt: '2024-01-18T10:00:00Z',
  },
];

export default function Results() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRows, setSelectedRows] = useState<Result[]>([]);

  const filteredResults = mockResults.filter(
    (result) =>
      result.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.assignmentTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns: Column<Result>[] = [
    {
      key: 'studentName',
      header: 'Student Name',
      sortable: true,
    },
    {
      key: 'assignmentTitle',
      header: 'Assignment',
      sortable: true,
    },
    {
      key: 'grade',
      header: 'Grade',
      sortable: true,
      render: (row) => {
        const percentage = calculatePercentage(row.grade, row.maxGrade);
        return (
          <div className="flex items-center gap-2">
            <span className={`font-semibold ${getGradeColor(percentage)}`}>
              {row.grade}/{row.maxGrade}
            </span>
            <span className="text-xs text-gray-500">({percentage}%)</span>
          </div>
        );
      },
    },
    {
      key: 'submittedAt',
      header: 'Submitted',
      sortable: true,
      render: (row) => <span className="text-sm">{formatDate(row.submittedAt)}</span>,
    },
    {
      key: 'gradedAt',
      header: 'Graded',
      sortable: true,
      render: (row) =>
        row.gradedAt ? (
          <span className="text-sm">{formatDate(row.gradedAt)}</span>
        ) : (
          <span className="text-sm text-yellow-600">Pending</span>
        ),
    },
  ];

  const handleExport = (format: 'csv' | 'pdf') => {
    // Mock export functionality
    console.log(`Exporting results as ${format.toUpperCase()}`);
    alert(`Export as ${format.toUpperCase()} - Feature coming soon!`);
  };

  // Calculate statistics
  const totalResults = filteredResults.length;
  const averageGrade =
    totalResults > 0
      ? Math.round(
          filteredResults.reduce((sum, r) => sum + calculatePercentage(r.grade, r.maxGrade), 0) /
            totalResults
        )
      : 0;
  const highestGrade = Math.max(
    ...filteredResults.map((r) => calculatePercentage(r.grade, r.maxGrade))
  );
  const lowestGrade = Math.min(
    ...filteredResults.map((r) => calculatePercentage(r.grade, r.maxGrade))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Results</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            View and manage student results
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            icon={<Download size={18} />}
            onClick={() => handleExport('csv')}
          >
            Export CSV
          </Button>
          <Button
            variant="outline"
            icon={<Download size={18} />}
            onClick={() => handleExport('pdf')}
          >
            Export PDF
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Results', value: totalResults, color: 'blue' },
          { label: 'Average Grade', value: `${averageGrade}%`, color: 'green' },
          { label: 'Highest Grade', value: `${highestGrade}%`, color: 'purple' },
          { label: 'Lowest Grade', value: `${lowestGrade}%`, color: 'orange' },
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

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <Input
                placeholder="Search by student or assignment..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<Search size={18} />}
              />
            </div>
            <Button variant="outline" icon={<Filter size={18} />}>
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Results ({filteredResults.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table
            data={filteredResults}
            columns={columns}
            selectable
            selectedRows={selectedRows}
            onSelectionChange={setSelectedRows}
          />

          {selectedRows.length > 0 && (
            <div className="mt-4 flex items-center gap-3">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {selectedRows.length} row(s) selected
              </p>
              <Button variant="danger" size="sm">
                Delete Selected
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
