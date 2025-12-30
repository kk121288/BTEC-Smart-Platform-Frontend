export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-96 border border-gray-100">
        <h1 className="text-3xl font-extrabold text-center mb-8 text-gray-800">
          BTEC Smart Platform
        </h1>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <button className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}