import "./App.css";
import { Toaster } from "react-hot-toast";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/layout";
import Organizations from "./components/organization/Organizations";
import Contacts from "./components/contact/Contacts";
import AddOrganization from "./components/organization/AddOrganization";
import AddContact from "./components/contact/AddContact";
import EditOrganization from "./components/organization/EditOrganization";
import EditContact from "./components/contact/EditContact";
import NotFound from "./components/NotFound";

function App() {
  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/organizations" replace />} />
          <Route
            path="/organizations"
            element={
              <Layout>
                <Organizations />
              </Layout>
            }
          />
          <Route
            path="/contacts"
            element={
              <Layout>
                <Contacts />
              </Layout>
            }
          />

          <Route
            path="/organizations/add"
            element={
              <Layout>
                <AddOrganization />
              </Layout>
            }
          />
          <Route
            path="/contacts/add"
            element={
              <Layout>
                <AddContact />
              </Layout>
            }
          />

          <Route
            path="/organizations/edit/:id"
            element={
              <Layout>
                <EditOrganization />
              </Layout>
            }
          />
          <Route
            path="/contacts/edit/:id"
            element={
              <Layout>
                <EditContact />
              </Layout>
            }
          />

          <Route path="/notFound" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
