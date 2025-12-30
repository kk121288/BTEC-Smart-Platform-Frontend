import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Upload, CheckCircle, AlertCircle } from 'lucide-react';
import Card, { CardContent, CardHeader, CardTitle, CardFooter } from '../components/ui/Card';
import Button from '../components/ui/Button';
import type { Assignment } from '../types';
import { formatDate, getTimeRemaining } from '../lib/utils';
import { cn } from '../lib/utils';

// Mock data
const mockAssignments: Assignment[] = [
  {
    id: '1',
    title: 'Database Design Project',
    description: 'Design and implement a relational database for a school management system.',
    dueDate: '2024-02-15T23:59:59Z',
    status: 'pending',
    maxGrade: 100,
  },
  {
    id: '2',
    title: 'Web Development Final',
    description: 'Build a responsive web application using React and Node.js.',
    dueDate: '2024-02-20T23:59:59Z',
    status: 'submitted',
    submittedAt: '2024-02-18T10:30:00Z',
    maxGrade: 100,
  },
  {
    id: '3',
    title: 'Programming Fundamentals Quiz',
    description: 'Complete the online quiz covering topics from weeks 1-5.',
    dueDate: '2024-02-10T23:59:59Z',
    status: 'graded',
    grade: 85,
    maxGrade: 100,
    submittedAt: '2024-02-09T14:00:00Z',
  },
  {
    id: '4',
    title: 'Software Engineering Report',
    description: 'Write a comprehensive report on software development methodologies.',
    dueDate: '2024-02-25T23:59:59Z',
    status: 'pending',
    maxGrade: 100,
  },
];

const statusConfig = {
  pending: {
    label: 'Pending',
    color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    icon: Clock,
  },
  submitted: {
    label: 'Submitted',
    color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    icon: CheckCircle,
  },
  graded: {
    label: 'Graded',
    color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    icon: CheckCircle,
  },
};

export default function Assignments() {
  const [filter, setFilter] = useState<'all' | 'pending' | 'submitted' | 'graded'>('all');

  const filteredAssignments =
    filter === 'all'
      ? mockAssignments
      : mockAssignments.filter((a) => a.status === filter);

  const stats = {
    total: mockAssignments.length,
    pending: mockAssignments.filter((a) => a.status === 'pending').length,
    submitted: mockAssignments.filter((a) => a.status === 'submitted').length,
    graded: mockAssignments.filter((a) => a.status === 'graded').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Assignments</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          View and submit your assignments
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: stats.total, filter: 'all' as const },
          { label: 'Pending', value: stats.pending, filter: 'pending' as const },
          { label: 'Submitted', value: stats.submitted, filter: 'submitted' as const },
          { label: 'Graded', value: stats.graded, filter: 'graded' as const },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              hover
              className={cn(
                'cursor-pointer',
                filter === stat.filter && 'ring-2 ring-blue-500'
              )}
              onClick={() => setFilter(stat.filter)}
            >
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

      {/* Assignments Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredAssignments.map((assignment, index) => {
          const statusInfo = statusConfig[assignment.status];
          const StatusIcon = statusInfo.icon;

          return (
            <motion.div
              key={assignment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Card hover className="h-full flex flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <CardTitle className="flex-1">{assignment.title}</CardTitle>
                    <span className={cn('px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5', statusInfo.color)}>
                      <StatusIcon size={14} />
                      {statusInfo.label}
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="flex-1">
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {assignment.description}
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar size={16} className="text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">
                        Due: {formatDate(assignment.dueDate)}
                      </span>
                    </div>

                    {assignment.status === 'pending' && (
                      <div className="flex items-center gap-2 text-sm">
                        <Clock size={16} className="text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">
                          {getTimeRemaining(assignment.dueDate)}
                        </span>
                      </div>
                    )}

                    {assignment.submittedAt && (
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle size={16} className="text-green-500" />
                        <span className="text-gray-600 dark:text-gray-400">
                          Submitted: {formatDate(assignment.submittedAt)}
                        </span>
                      </div>
                    )}

                    {assignment.status === 'graded' && assignment.grade !== undefined && (
                      <div className="mt-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-800">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Your Grade:
                          </span>
                          <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                            {assignment.grade}/{assignment.maxGrade}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="border-t border-gray-200 dark:border-gray-700">
                  {assignment.status === 'pending' && (
                    <Button variant="primary" icon={<Upload size={18} />} className="w-full">
                      Submit Assignment
                    </Button>
                  )}
                  {assignment.status === 'submitted' && (
                    <Button variant="outline" className="w-full" disabled>
                      Awaiting Grade
                    </Button>
                  )}
                  {assignment.status === 'graded' && (
                    <Button variant="outline" className="w-full">
                      View Feedback
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {filteredAssignments.length === 0 && (
        <Card>
          <CardContent className="p-12">
            <div className="text-center">
              <AlertCircle className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No Assignments Found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                No assignments match the selected filter.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
