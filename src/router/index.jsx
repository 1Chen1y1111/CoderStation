import { Route, Routes, Navigate } from "react-router-dom";

import Issues from "../pages/Issues";
import Books from "../pages/Books";
import Interviews from "../pages/Interviews";
import AddIssue from "../pages/AddIssue";
import IssueDetail from "../pages/IssueDetail";
import SearchPage from "../pages/SearchPage";

function RouterConfig() {
  return (
    <Routes>
      <Route path="/issues" element={<Issues />} />
      <Route path="/books" element={<Books />} />
      <Route path="/interviews" element={<Interviews />} />
      <Route path="/addIssue" element={<AddIssue />} />
      <Route path="/issueDetail/:id" element={<IssueDetail />} />
      <Route path="/searchPage" element={<SearchPage />} />
      <Route path="/" element={<Navigate replace to="/issues" />} />
    </Routes>
  );
}

export default RouterConfig;
