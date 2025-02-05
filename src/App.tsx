import Layout from "./components/layout/Layout";
import Editor from "./components/editor/Editor";

function App() {
  return (
    <Layout>
      <div className="min-h-screen bg-[#f5f6f8]">
        <div className="h-full px-12 py-10">
          <Editor />
        </div>
      </div>
    </Layout>
  );
}

export default App;
