import AppLayout from '../layouts/AppLayout';

const Results = () => {
  return (
    <AppLayout>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Plagiarism Results
        </h1>
        <p className="text-gray-600">
          View plagiarism detection results for all submitted assignments.
        </p>
        <div className="mt-6">
          <p className="text-gray-500">No results available yet...</p>
        </div>
      </div>
    </AppLayout>
  );
};

export default Results;
