import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import DashboardHome from "./pages/DashboardHome";
import BookGenresPage from "./pages/BookGenresPage";
import ProfilePage from "./pages/ProfilePage"; 
import MyWorksPage from "./pages/MyWorksPage";
import FavoritesPage from "./pages/FavoritesPage";
import ProtectedRoute from "./components/ProtectedRoute"; // 1. IMPORT THE BOUNCER

function App() {
  return (
      <Routes>
        <Route path="/" element={<LoginPage />} />

        {/* 2. WRAP THE DASHBOARD WITH THE PROTECTED ROUTE */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />}>
            <Route index element={<DashboardHome />} />
            <Route path="genres" element={<BookGenresPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="myworks" element={<MyWorksPage />} />
            <Route path="favorites" element={<FavoritesPage />} />
          </Route>
        </Route>
      </Routes>
  );
}

export default App;