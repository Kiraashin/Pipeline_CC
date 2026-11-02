import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// AUTH
import ProtectedRoute from "./protectedRoutes";

// PUBLIC
import LoginPage from "./creatorPages/Login";
import RegisterPage from "./creatorPages/Register";

// CREATOR
import MainLayout from "./creatorPages/MainLayout";
import OnboardingFeedPage from "./Dialog/OnBoarding";
import TabsUnderline from "./creatorPages/UserSetting";
import Pipeline from "./creatorPages/Pipeline";
import ProductListPage from "./creatorPages/Channel";
import ContentPage from "./creatorPages/Content";
import WidgetCardPreview from "./creatorPages/Team";
import ContentPerformance from "./creatorPages/Analysis";

// ADMIN
import AdminLayout from "./adminPages/AdminLayout";
import AdminChannels from "./adminPages/AdminChannel";
import AdminContent from "./adminPages/AdminContent";

// EDITOR
import EditorLayout from "./editorPages/EditorLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* ADMIN ROUTES */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="/admin/contents" element={<AdminContent />} />
            <Route path="/admin/channels" element={<AdminChannels />} />

          </Route>
        </Route>

        {/* EDITOR ROUTES */}
        <Route element={<ProtectedRoute allowedRoles={["editor"]} />}>
          <Route path="/editor" element={<EditorLayout />}>

            {/* <Route index element={<EditorDashboard />} /> */}
            {/* <Route path="tasks" element={<EditorTasks />} /> */}
            {/* <Route path="contents" element={<EditorContents />} /> */}
            {/* <Route path="archives" element={<EditorArchives />} /> */}

          </Route>
        </Route>

        {/* CREATOR ROUTES */}
        <Route element={<ProtectedRoute allowedRoles={["creator"]} />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Pipeline />} />
            <Route path="/usersetting" element={<TabsUnderline />} />
            <Route path="/channel" element={<ProductListPage />} />
            <Route path="/content" element={<ContentPage />} />
            <Route path="/team" element={<WidgetCardPreview />} />
            <Route path="/analisis-performa" element={<ContentPerformance />} />
          </Route>

          <Route path="/onboarding" element={<OnboardingFeedPage />} />
        </Route>

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;