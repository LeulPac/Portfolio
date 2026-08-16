import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Providers
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { AnalyticsProvider } from './context/AnalyticsContext';

// Common Components
import ProtectedRoute from './components/common/ProtectedRoute';

// Public Pages
import HomePage from './pages/public/HomePage';
import ProjectDetailsPage from './pages/public/ProjectDetailsPage';
import NotFoundPage from './pages/public/NotFoundPage';

// Admin Pages
import LoginPage from './pages/admin/LoginPage';
import ForgotPasswordPage from './pages/admin/ForgotPasswordPage';
import DashboardOverviewPage from './pages/admin/DashboardOverviewPage';
import ProjectsAdminPage from './pages/admin/ProjectsAdminPage';
import SkillsAdminPage from './pages/admin/SkillsAdminPage';
import ExperienceAdminPage from './pages/admin/ExperienceAdminPage';
import EducationAdminPage from './pages/admin/EducationAdminPage';
import CertificatesAdminPage from './pages/admin/CertificatesAdminPage';
import ServicesAdminPage from './pages/admin/ServicesAdminPage';
import MessagesAdminPage from './pages/admin/MessagesAdminPage';
import AnalyticsAdminPage from './pages/admin/AnalyticsAdminPage';
import SettingsAdminPage from './pages/admin/SettingsAdminPage';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AnalyticsProvider>
          <Routes>
            {/* Public Portfolio Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/projects/:slug" element={<ProjectDetailsPage />} />

            {/* Admin Auth Routes */}
            <Route path="/admin/login" element={<LoginPage />} />
            <Route path="/admin/forgot-password" element={<ForgotPasswordPage />} />

            {/* Protected Admin Dashboard Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/admin/dashboard" element={<DashboardOverviewPage />} />
              <Route path="/admin/projects" element={<ProjectsAdminPage />} />
              <Route path="/admin/skills" element={<SkillsAdminPage />} />
              <Route path="/admin/experience" element={<ExperienceAdminPage />} />
              <Route path="/admin/education" element={<EducationAdminPage />} />
              <Route path="/admin/certificates" element={<CertificatesAdminPage />} />
              <Route path="/admin/services" element={<ServicesAdminPage />} />
              <Route path="/admin/messages" element={<MessagesAdminPage />} />
              <Route path="/admin/analytics" element={<AnalyticsAdminPage />} />
              <Route path="/admin/settings" element={<SettingsAdminPage />} />
            </Route>

            {/* Fallback 404 Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AnalyticsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
