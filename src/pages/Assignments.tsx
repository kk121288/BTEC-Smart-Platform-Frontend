import AppLayout from '../layouts/AppLayout';

const Assignments = () => {
  return (
    <AppLayout>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Assignments</h1>
        <p className="text-gray-600">
          View and manage all assignments for plagiarism checking.
        </p>
        <div className="mt-6">
          <p className="text-gray-500">Assignment list coming soon...</p>
        </div>
      </div>
    </AppLayout>
  );
};

export default Assignments;
