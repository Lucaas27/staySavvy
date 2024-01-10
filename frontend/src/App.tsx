import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "./layouts/Layout";
import Authentication from "./pages/Authentication";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <p>Home Page</p>
            </Layout>
          }
        ></Route>
        <Route
          path="/register"
          element={
            <Layout>
              <Authentication isSignIn={false} />
            </Layout>
          }
        ></Route>
        <Route
          path="/login"
          element={
            <Layout>
              <Authentication isSignIn={true} />
            </Layout>
          }
        ></Route>
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
