import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Layout from "./components/common/Layout";

function App() {
  return (
    <div className="App">
      <Layout>
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
      </Layout>
    </div>
  );
}

export default App;
