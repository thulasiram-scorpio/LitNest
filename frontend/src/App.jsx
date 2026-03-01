import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import DashboardHome from "./pages/DashboardHome";
import BookGenresPage from "./pages/BookGenresPage";

function App() {
  return (
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route path="/dashboard" element={<DashboardPage />}>
          <Route index element={<DashboardHome />} />
          <Route path="genres" element={<BookGenresPage />} />
        </Route>
      </Routes>
  );
}

export default App;
