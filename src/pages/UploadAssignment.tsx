import AppLayout from '../layouts/AppLayout';

const UploadAssignment = () => {
  return (
    <AppLayout>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Upload Assignment
        </h1>
        <p className="text-gray-600">
          This page will allow you to upload assignments for plagiarism checking.
        </p>
        <div className="mt-6 p-8 border-2 border-dashed border-gray-300 rounded-lg text-center">
          <p className="text-gray-500">Upload functionality coming soon...</p>
        </div>
      </div>
    </AppLayout>
  );
};

export default UploadAssignment;
