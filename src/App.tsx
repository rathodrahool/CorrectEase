import Layout from "./components/layout/Layout";

function App() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">
            Welcome to CorrectEase
          </h1>
          <div className="prose">
            <p className="text-gray-600">
              Get started by creating a new document or accessing your recent
              work from the navigation panel.
            </p>
          </div>

          {/* Quick Start Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Create New Document
              </h3>
              <p className="text-gray-600 text-sm">
                Start fresh with a new document and begin writing.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                View Recent Work
              </h3>
              <p className="text-gray-600 text-sm">
                Continue working on your recent documents.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default App;
