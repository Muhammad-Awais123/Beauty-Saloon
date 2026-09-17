import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';

// Layouts (Static for instant shell rendering)
import PublicLayout from './components/layout/PublicLayout';
import CustomerLayout from './components/layout/CustomerLayout';
import AdminLayout from './components/layout/AdminLayout';
import PortfolioAgencyBar from './components/layout/PortfolioAgencyBar';
import ScrollToTop from './components/common/ScrollToTop';
import PageLoader from './components/common/PageLoader';

// Lazy Loaded Public Pages for maximum performance
const Home = lazy(() => import('./pages/website/Home'));
const About = lazy(() => import('./pages/website/About'));
const Services = lazy(() => import('./pages/website/Services'));
const ServiceDetail = lazy(() => import('./pages/website/ServiceDetail'));
const Team = lazy(() => import('./pages/website/Team'));
const TeamDetail = lazy(() => import('./pages/website/TeamDetail'));
const Pricing = lazy(() => import('./pages/website/Pricing'));
const Gallery = lazy(() => import('./pages/website/Gallery'));
const BeforeAfter = lazy(() => import('./pages/website/BeforeAfter'));
const AppointmentBooking = lazy(() => import('./pages/website/AppointmentBooking'));
const Blog = lazy(() => import('./pages/website/Blog'));
const BlogDetail = lazy(() => import('./pages/website/BlogDetail'));
const Faq = lazy(() => import('./pages/website/Faq'));
const Contact = lazy(() => import('./pages/website/Contact'));
const Privacy = lazy(() => import('./pages/website/Privacy'));
const Terms = lazy(() => import('./pages/website/Terms'));
const NotFound = lazy(() => import('./pages/website/NotFound'));

// Lazy Loaded Auth Pages
const Login = lazy(() => import('./pages/auth/Login'));
const AdminLogin = lazy(() => import('./pages/auth/AdminLogin'));

// Lazy Loaded Customer Dashboard Pages
const CustomerDashboard = lazy(() => import('./pages/dashboard/CustomerDashboard'));
const CustomerAppointments = lazy(() => import('./pages/dashboard/CustomerAppointments'));
const CustomerProfile = lazy(() => import('./pages/dashboard/CustomerProfile'));
const CustomerFavorites = lazy(() => import('./pages/dashboard/CustomerFavorites'));
const CustomerReviews = lazy(() => import('./pages/dashboard/CustomerReviews'));
const CustomerNotifications = lazy(() => import('./pages/dashboard/CustomerNotifications'));
const CustomerSettings = lazy(() => import('./pages/dashboard/CustomerSettings'));

// Lazy Loaded Admin Operations Suite Pages (17 Sections)
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminAppointments = lazy(() => import('./pages/admin/AdminAppointments'));
const AdminCalendar = lazy(() => import('./pages/admin/AdminCalendar'));
const AdminCustomers = lazy(() => import('./pages/admin/AdminCustomers'));
const AdminStaff = lazy(() => import('./pages/admin/AdminStaff'));
const AdminServices = lazy(() => import('./pages/admin/AdminServices'));
const AdminPackages = lazy(() => import('./pages/admin/AdminPackages'));
const AdminBeforeAfter = lazy(() => import('./pages/admin/AdminBeforeAfter'));
const AdminGallery = lazy(() => import('./pages/admin/AdminGallery'));
const AdminBlogCMS = lazy(() => import('./pages/admin/AdminBlogCMS'));
const AdminReviews = lazy(() => import('./pages/admin/AdminReviews'));
const AdminPayments = lazy(() => import('./pages/admin/AdminPayments'));
const AdminCoupons = lazy(() => import('./pages/admin/AdminCoupons'));
const AdminNotifications = lazy(() => import('./pages/admin/AdminNotifications'));
const AdminAnalytics = lazy(() => import('./pages/admin/AdminAnalytics'));
const AdminReports = lazy(() => import('./pages/admin/AdminReports'));
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings'));

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <AppProvider>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              
              {/* PUBLIC WEBSITE ROUTES */}
              <Route path="/" element={<PublicLayout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="services" element={<Services />} />
                <Route path="services/:id" element={<ServiceDetail />} />
                <Route path="team" element={<Team />} />
                <Route path="team/:id" element={<TeamDetail />} />
                <Route path="pricing" element={<Pricing />} />
                <Route path="gallery" element={<Gallery />} />
                <Route path="before-after" element={<BeforeAfter />} />
                <Route path="appointments" element={<AppointmentBooking />} />
                <Route path="blog" element={<Blog />} />
                <Route path="blog/:id" element={<BlogDetail />} />
                <Route path="faq" element={<Faq />} />
                <Route path="contact" element={<Contact />} />
                <Route path="privacy" element={<Privacy />} />
                <Route path="terms" element={<Terms />} />
                <Route path="login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
              </Route>

              {/* ADMIN LOGIN */}
              <Route path="/admin/login" element={
                <>
                  <PortfolioAgencyBar />
                  <AdminLogin />
                </>
              } />

              {/* CUSTOMER PORTAL */}
              <Route path="/dashboard" element={
                <>
                  <PortfolioAgencyBar />
                  <CustomerLayout />
                </>
              }>
                <Route index element={<CustomerDashboard />} />
                <Route path="appointments" element={<CustomerAppointments />} />
                <Route path="profile" element={<CustomerProfile />} />
                <Route path="favorites" element={<CustomerFavorites />} />
                <Route path="reviews" element={<CustomerReviews />} />
                <Route path="notifications" element={<CustomerNotifications />} />
                <Route path="settings" element={<CustomerSettings />} />
              </Route>

              {/* ADMIN OPERATIONS SUITE (17 SECTIONS) */}
              <Route path="/admin" element={
                <>
                  <PortfolioAgencyBar />
                  <AdminLayout />
                </>
              }>
                <Route index element={<AdminDashboard />} />
                <Route path="appointments" element={<AdminAppointments />} />
                <Route path="calendar" element={<AdminCalendar />} />
                <Route path="customers" element={<AdminCustomers />} />
                <Route path="staff" element={<AdminStaff />} />
                <Route path="services" element={<AdminServices />} />
                <Route path="packages" element={<AdminPackages />} />
                <Route path="before-after" element={<AdminBeforeAfter />} />
                <Route path="gallery" element={<AdminGallery />} />
                <Route path="blog" element={<AdminBlogCMS />} />
                <Route path="reviews" element={<AdminReviews />} />
                <Route path="payments" element={<AdminPayments />} />
                <Route path="coupons" element={<AdminCoupons />} />
                <Route path="notifications" element={<AdminNotifications />} />
                <Route path="analytics" element={<AdminAnalytics />} />
                <Route path="reports" element={<AdminReports />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>

            </Routes>
          </Suspense>

          {/* Toastify Notification Container */}
          <ToastContainer
            position="top-right"
            autoClose={3200}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
