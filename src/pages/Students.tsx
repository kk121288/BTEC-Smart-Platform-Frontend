import AppLayout from '../layouts/AppLayout';

const Students = () => {
  return (
    <AppLayout>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Students</h1>
        <p className="text-gray-600">
          Manage and view all students in your courses.
        </p>
        <div className="mt-6">
          <p className="text-gray-500">Student list coming soon...</p>
        </div>
      </div>
    </AppLayout>
  );
};

export default Students;
