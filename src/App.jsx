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
import DashboardIndexPage from "../komponen tambahan/src/modules/dashboard/pages/DashboardIndexPage";

// ADMIN
import AdminLayout from "./adminPages/AdminLayout";
import AdminChannels from "./adminPages/AdminChannel";
import AdminContent from "./adminPages/AdminContent";
import AdminUser from "./adminPages/AdminUser";

// EDITOR
import EditorLayout from "./editorPages/EditorLayout";
import DashboardIndexPages from "./editorPages/EditorPipeline";
import ContentDetailPage from "../komponen tambahan/src/modules/content/pages/ContentDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/dashboard" element={<DashboardShell />}></Route>
=======

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* ADMIN ROUTES */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/" element={<AdminLayout />}>
            <Route path="/admin/contents" element={<AdminContent />} />
            <Route path="/admin/channels" element={<AdminChannels />} />
            <Route path="/admin" element={<AdminUser />} />
          </Route>
        </Route>

        {/* EDITOR ROUTES */}
        <Route element={<ProtectedRoute allowedRoles={["editor"]} />}>
          <Route path="/" element={<EditorLayout />}>
            <Route path="/editor" element={<DashboardIndexPages />} />
            {/* <Route path="tasks" element={<EditorTasks />} /> */}
            {/* <Route path="contents" element={<EditorContents />} /> */}
            {/* <Route path="archives" element={<EditorArchives />} /> */}

          </Route>
        </Route>

        {/* CREATOR ROUTES */}
        <Route element={<ProtectedRoute allowedRoles={["creator"]} />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<DashboardIndexPage />} />
            <Route path="/usersetting" element={<TabsUnderline />} />
            <Route path="/channel" element={<ProductListPage />} /> 
            <Route path="/content" element={<ContentPage />} />
            <Route path="/content/:id" element={<ContentDetailPage />} />
            {/* <Route path="/team" element={<WidgetCardPreview />} />
            <Route path="/analisis-performa" element={<ContentPerformance />} /> */}
          </Route>

          <Route path="/onboarding" element={<OnboardingFeedPage />} />
        </Route>

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/login" replace />} />

>>>>>>> development
      </Routes>
    </BrowserRouter>
  );
}

<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> development
