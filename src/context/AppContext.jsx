import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import confetti from 'canvas-confetti';

import { INITIAL_SERVICES } from '../data/servicesData';
import { INITIAL_TEAM } from '../data/teamData';
import { INITIAL_PACKAGES } from '../data/packagesData';
import { INITIAL_BLOGS } from '../data/blogsData';
import { INITIAL_BEFORE_AFTER } from '../data/beforeAfterData';
import { INITIAL_GALLERY } from '../data/galleryData';
import { INITIAL_TESTIMONIALS } from '../data/testimonialsData';
import { INITIAL_APPOINTMENTS } from '../data/appointmentsData';
import { INITIAL_CUSTOMERS } from '../data/customersData';
import { INITIAL_PAYMENTS } from '../data/paymentsData';
import { INITIAL_COUPONS } from '../data/couponsData';
import { INITIAL_FAQS } from '../data/faqsData';

const AppContext = createContext(null);

const DEFAULT_SETTINGS = {
  clinicName: 'Élan Aesthetic Clinic',
  tagline: 'Advanced Care. Confident You.',
  phone: '+1 (800) 555-ELAN',
  email: 'concierge@elanclinic.com',
  address: '450 Lexington Avenue, Suite 1800, New York, NY 10017',
  whatsapp: '+1 (800) 555-3526',
  openingHours: {
    weekdays: 'Monday – Friday: 08:30 AM – 07:00 PM',
    saturday: 'Saturday: 09:00 AM – 06:00 PM',
    sunday: 'Sunday: Closed for Clinical Sterilization'
  },
  bookingSettings: {
    slotDurationMinutes: 45,
    advanceBookingDays: 60,
    minCancellationHours: 24,
    allowGuestBooking: true,
    requireDeposit: false,
    depositAmount: 50
  },
  notificationsConfig: {
    emailConfirmations: true,
    smsReminders: true,
    promoEmails: false
  }
};

const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-01',
    type: 'appointment',
    target: 'admin',
    title: 'New Appointment Booked',
    message: 'Emily Watson booked HydraFacial Elite for Mar 22 at 10:30 AM.',
    time: '10 minutes ago',
    read: false,
    link: '/admin/appointments'
  },
  {
    id: 'notif-02',
    type: 'payment',
    target: 'admin',
    title: 'Payment Received ($270.00)',
    message: 'Transaction TXN-984211 for Alexander Hayes settled via Apple Pay.',
    time: '2 hours ago',
    read: false,
    link: '/admin/payments'
  },
  {
    id: 'notif-03',
    type: 'review',
    target: 'admin',
    title: 'New 5-Star Review Submitted',
    message: 'Camilla Dupont left a 5-star review for Dr. Sophia Martinez.',
    time: '1 day ago',
    read: true,
    link: '/admin/reviews'
  },
  {
    id: 'notif-04',
    type: 'appointment',
    target: 'customer',
    title: 'Upcoming Appointment Reminder',
    message: 'Your HydraFacial Elite appointment is scheduled for Mar 22 at 10:30 AM.',
    time: '1 day ago',
    read: false,
    link: '/dashboard/appointments'
  }
];

function loadStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

export function AppProvider({ children }) {
  const [services, setServices] = useState(() => loadStorage('elan_services', INITIAL_SERVICES));
  const [team, setTeam] = useState(() => loadStorage('elan_team', INITIAL_TEAM));
  const [packages, setPackages] = useState(() => loadStorage('elan_packages', INITIAL_PACKAGES));
  const [blogs, setBlogs] = useState(() => loadStorage('elan_blogs', INITIAL_BLOGS));
  const [beforeAfter, setBeforeAfter] = useState(() => loadStorage('elan_before_after', INITIAL_BEFORE_AFTER));
  const [gallery, setGallery] = useState(() => loadStorage('elan_gallery', INITIAL_GALLERY));
  const [reviews, setReviews] = useState(() => loadStorage('elan_reviews', INITIAL_TESTIMONIALS));
  const [appointments, setAppointments] = useState(() => loadStorage('elan_appointments', INITIAL_APPOINTMENTS));
  const [customers, setCustomers] = useState(() => loadStorage('elan_customers', INITIAL_CUSTOMERS));
  const [payments, setPayments] = useState(() => loadStorage('elan_payments', INITIAL_PAYMENTS));
  const [coupons, setCoupons] = useState(() => loadStorage('elan_coupons', INITIAL_COUPONS));
  const [faqs, setFaqs] = useState(() => loadStorage('elan_faqs', INITIAL_FAQS));
  const [settings, setSettings] = useState(() => loadStorage('elan_settings', DEFAULT_SETTINGS));
  const [notifications, setNotifications] = useState(() => loadStorage('elan_notifications', INITIAL_NOTIFICATIONS));
  const [favorites, setFavorites] = useState(() => loadStorage('elan_favorites', ['hydrafacial-elite', 'profhilo-bio-remodeling']));

  // Sync to local storage
  useEffect(() => { localStorage.setItem('elan_services', JSON.stringify(services)); }, [services]);
  useEffect(() => { localStorage.setItem('elan_team', JSON.stringify(team)); }, [team]);
  useEffect(() => { localStorage.setItem('elan_packages', JSON.stringify(packages)); }, [packages]);
  useEffect(() => { localStorage.setItem('elan_blogs', JSON.stringify(blogs)); }, [blogs]);
  useEffect(() => { localStorage.setItem('elan_before_after', JSON.stringify(beforeAfter)); }, [beforeAfter]);
  useEffect(() => { localStorage.setItem('elan_gallery', JSON.stringify(gallery)); }, [gallery]);
  useEffect(() => { localStorage.setItem('elan_reviews', JSON.stringify(reviews)); }, [reviews]);
  useEffect(() => { localStorage.setItem('elan_appointments', JSON.stringify(appointments)); }, [appointments]);
  useEffect(() => { localStorage.setItem('elan_customers', JSON.stringify(customers)); }, [customers]);
  useEffect(() => { localStorage.setItem('elan_payments', JSON.stringify(payments)); }, [payments]);
  useEffect(() => { localStorage.setItem('elan_coupons', JSON.stringify(coupons)); }, [coupons]);
  useEffect(() => { localStorage.setItem('elan_faqs', JSON.stringify(faqs)); }, [faqs]);
  useEffect(() => { localStorage.setItem('elan_settings', JSON.stringify(settings)); }, [settings]);
  useEffect(() => { localStorage.setItem('elan_notifications', JSON.stringify(notifications)); }, [notifications]);
  useEffect(() => { localStorage.setItem('elan_favorites', JSON.stringify(favorites)); }, [favorites]);

  // Notifications helper
  const addNotification = (notif) => {
    const newNotif = {
      id: 'notif-' + Date.now(),
      time: 'Just now',
      read: false,
      ...notif
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = (target = null) => {
    setNotifications(prev => prev.map(n => (!target || n.target === target) ? { ...n, read: true } : n));
    toast.success('All notifications marked as read');
  };

  // --- APPOINTMENTS CRUD ---
  const bookAppointment = (bookingData) => {
    const bookingId = 'ELAN-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
    const txnId = 'TXN-' + Math.floor(100000 + Math.random() * 900000);
    
    const newAppointment = {
      id: 'apt-' + Date.now(),
      bookingId,
      customerId: bookingData.customerId || 'cust-01',
      customerName: bookingData.customerName,
      customerEmail: bookingData.customerEmail,
      customerPhone: bookingData.customerPhone,
      serviceId: bookingData.serviceId,
      serviceName: bookingData.serviceName,
      specialistId: bookingData.specialistId,
      specialistName: bookingData.specialistName,
      date: bookingData.date,
      time: bookingData.time,
      duration: bookingData.duration || '60 mins',
      price: bookingData.price,
      discount: bookingData.discount || 0,
      couponCode: bookingData.couponCode || '',
      total: bookingData.total,
      status: 'confirmed',
      paymentStatus: bookingData.paymentMethod === 'Pay at Clinic' ? 'pending' : 'paid',
      paymentMethod: bookingData.paymentMethod || 'Credit Card',
      transactionId: txnId,
      notes: bookingData.notes || 'Online client booking.',
      createdAt: new Date().toISOString()
    };

    setAppointments(prev => [newAppointment, ...prev]);

    // Record payment ledger
    const newPayment = {
      id: 'pay-' + Date.now(),
      transactionId: txnId,
      appointmentId: newAppointment.id,
      bookingId: newAppointment.bookingId,
      customerName: newAppointment.customerName,
      customerEmail: newAppointment.customerEmail,
      serviceName: newAppointment.serviceName,
      amount: newAppointment.total,
      method: newAppointment.paymentMethod,
      cardLast4: bookingData.paymentMethod === 'Pay at Clinic' ? '—' : '4242',
      status: newAppointment.paymentStatus,
      date: new Date().toLocaleString(),
      invoiceNumber: 'INV-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000)
    };
    setPayments(prev => [newPayment, ...prev]);

    // Update customer stats or add new customer if doesn't exist
    setCustomers(prev => {
      const existing = prev.find(c => c.email.toLowerCase() === newAppointment.customerEmail.toLowerCase());
      if (existing) {
        return prev.map(c => c.id === existing.id ? {
          ...c,
          totalVisits: c.totalVisits + 1,
          totalSpent: c.totalSpent + newAppointment.total,
          lastAppointment: newAppointment.date,
          loyaltyPoints: c.loyaltyPoints + Math.floor(newAppointment.total / 10)
        } : c);
      } else {
        const newCust = {
          id: 'cust-' + Date.now(),
          name: newAppointment.customerName,
          email: newAppointment.customerEmail,
          phone: newAppointment.customerPhone,
          avatar: '/images/team/team-doctor-03.jpg',
          gender: 'Unspecified',
          dob: '1990-01-01',
          totalVisits: 1,
          totalSpent: newAppointment.total,
          lastAppointment: newAppointment.date,
          loyaltyPoints: Math.floor(newAppointment.total / 10),
          status: 'active',
          membershipTier: 'Silver',
          notes: 'New client via web booking.',
          medicalAlerts: 'None reported.',
          favoriteServiceIds: [newAppointment.serviceId]
        };
        return [newCust, ...prev];
      }
    });

    // Notify Admin & Customer
    addNotification({
      type: 'appointment',
      target: 'admin',
      title: 'New Appointment: ' + newAppointment.customerName,
      message: `${newAppointment.serviceName} on ${newAppointment.date} at ${newAppointment.time}`,
      link: '/admin/appointments'
    });

    addNotification({
      type: 'appointment',
      target: 'customer',
      title: 'Appointment Confirmed #' + newAppointment.bookingId,
      message: `${newAppointment.serviceName} with ${newAppointment.specialistName} on ${newAppointment.date}`,
      link: '/dashboard/appointments'
    });

    // Confetti effect!
    try {
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2A4636', '#8FA895', '#D8A47F', '#5C7E67']
      });
    } catch {}

    toast.success(`Appointment Confirmed! Booking ID: ${bookingId}`);
    return newAppointment;
  };

  const updateAppointmentStatus = (id, newStatus) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
    toast.info(`Appointment status updated to: ${newStatus}`);
  };

  const rescheduleAppointment = (id, newDate, newTime) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, date: newDate, time: newTime, status: 'confirmed' } : a));
    toast.success(`Appointment rescheduled to ${newDate} at ${newTime}`);
  };

  const cancelAppointment = (id, reason = '') => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: 'cancelled', cancelReason: reason } : a));
    
    // Also mark payment refunded if it was paid
    setPayments(prev => prev.map(p => p.appointmentId === id ? { ...p, status: 'refunded' } : p));
    
    toast.warning('Appointment has been cancelled and refund processed.');
  };

  // --- SERVICES CRUD ---
  const addService = (serviceData) => {
    const newService = {
      id: 'srv-' + Date.now(),
      rating: 5.0,
      reviewsCount: 1,
      isFeatured: false,
      benefits: ['Customized clinical consultation', 'Medical-grade protocol', 'Personalized aftercare advice'],
      suitableFor: ['All skin types'],
      procedureSteps: [{ step: 1, title: 'Clinical Assessment', desc: 'In-depth skin and goal review' }],
      recoveryInfo: 'No downtime expected.',
      expectedResults: 'Visible enhancement in skin vitality.',
      ...serviceData
    };
    setServices(prev => [newService, ...prev]);
    toast.success(`Service "${newService.name}" added successfully.`);
  };

  const updateService = (id, updatedData) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...updatedData } : s));
    toast.success('Service updated successfully.');
  };

  const deleteService = (id) => {
    const s = services.find(item => item.id === id);
    setServices(prev => prev.filter(item => item.id !== id));
    toast.error(`Service "${s?.name || ''}" removed.`);
  };

  // --- STAFF CRUD ---
  const addStaff = (staffData) => {
    const newStaff = {
      id: 'staff-' + Date.now(),
      rating: 5.0,
      reviewsCount: 0,
      image: '/images/team/team-doctor-03.jpg',
      availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      availableSlots: ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'],
      education: ['Medical Aesthetics Specialization'],
      certifications: ['Board Certified Specialist'],
      servicesOffered: ['hydrafacial-elite'],
      ...staffData
    };
    setTeam(prev => [...prev, newStaff]);
    toast.success(`Staff member "${newStaff.name}" added.`);
  };

  const updateStaff = (id, updatedData) => {
    setTeam(prev => prev.map(t => t.id === id ? { ...t, ...updatedData } : t));
    toast.success('Specialist profile updated.');
  };

  const deleteStaff = (id) => {
    const st = team.find(t => t.id === id);
    setTeam(prev => prev.filter(t => t.id !== id));
    toast.error(`Specialist "${st?.name || ''}" removed.`);
  };

  // --- REVIEWS / TESTIMONIALS ---
  const submitReview = (reviewData) => {
    const newReview = {
      id: 'test-' + Date.now(),
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      verified: true,
      status: 'approved', // Auto-approved for demo smooth experience
      avatar: '/images/team/team-doctor-03.jpg',
      ...reviewData
    };
    setReviews(prev => [newReview, ...prev]);
    toast.success('Thank you! Your verified review has been published.');
  };

  const updateReviewStatus = (id, status) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    toast.info(`Review status updated to ${status}.`);
  };

  const toggleFeatureReview = (id) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, featured: !r.featured } : r));
    toast.success('Featured review toggled.');
  };

  // --- BLOG CMS ---
  const addBlog = (blogData) => {
    const newBlog = {
      id: 'blog-' + Date.now(),
      slug: blogData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      readTime: '4 min read',
      authorRole: 'Clinical Specialist',
      authorImage: '/images/team/team-doctor-01.jpg',
      ...blogData
    };
    setBlogs(prev => [newBlog, ...prev]);
    toast.success('Blog article published to CMS.');
  };

  const updateBlog = (id, updatedData) => {
    setBlogs(prev => prev.map(b => b.id === id ? { ...b, ...updatedData } : b));
    toast.success('Blog article updated.');
  };

  const deleteBlog = (id) => {
    setBlogs(prev => prev.filter(b => b.id !== id));
    toast.error('Blog post deleted.');
  };

  // --- COUPONS ---
  const applyCoupon = (code, subtotal) => {
    const coupon = coupons.find(c => c.code.toUpperCase() === code.trim().toUpperCase());
    if (!coupon) {
      toast.error('Invalid coupon code.');
      return { valid: false, error: 'Invalid coupon code' };
    }
    if (coupon.status !== 'active') {
      toast.error('This coupon code is no longer active.');
      return { valid: false, error: 'Coupon has expired' };
    }
    if (subtotal < coupon.minSpend) {
      toast.error(`Minimum spend of $${coupon.minSpend} required for code ${coupon.code}`);
      return { valid: false, error: `Minimum spend is $${coupon.minSpend}` };
    }

    let discount = 0;
    if (coupon.discountType === 'percentage') {
      discount = Math.round((subtotal * coupon.discountValue) / 100);
    } else {
      discount = Math.min(coupon.discountValue, subtotal);
    }

    toast.success(`Coupon "${coupon.code}" applied! You saved $${discount}.`);
    return { valid: true, coupon, discount };
  };

  const addCoupon = (couponData) => {
    const newCoupon = {
      id: 'coup-' + Date.now(),
      timesUsed: 0,
      status: 'active',
      ...couponData
    };
    setCoupons(prev => [newCoupon, ...prev]);
    toast.success(`Coupon ${newCoupon.code} created.`);
  };

  const deleteCoupon = (id) => {
    setCoupons(prev => prev.filter(c => c.id !== id));
    toast.error('Coupon removed.');
  };

  // --- CUSTOMER CRM ---
  const updateCustomer = (id, updatedData) => {
    setCustomers(prev => prev.map(c => c.id === id ? { ...c, ...updatedData } : c));
    toast.success('Customer record updated.');
  };

  const addCustomer = (customerData) => {
    const newCust = {
      id: 'cust-' + Date.now(),
      totalVisits: 0,
      totalSpent: 0,
      lastAppointment: 'None',
      loyaltyPoints: 50,
      status: 'active',
      membershipTier: 'Silver',
      avatar: '/images/team/team-doctor-03.jpg',
      favoriteServiceIds: [],
      ...customerData
    };
    setCustomers(prev => [newCust, ...prev]);
    toast.success(`Customer "${newCust.name}" added to CRM.`);
  };

  // --- FAVORITES ---
  const toggleFavorite = (serviceId) => {
    setFavorites(prev => {
      if (prev.includes(serviceId)) {
        toast.info('Removed treatment from favorites');
        return prev.filter(id => id !== serviceId);
      } else {
        toast.success('Saved treatment to favorites!');
        return [...prev, serviceId];
      }
    });
  };

  const isFavorite = (serviceId) => favorites.includes(serviceId);

  // --- SETTINGS ---
  const updateSettings = (newSettings) => {
    setSettings(newSettings);
    toast.success('Clinic settings saved successfully.');
  };

  // Reset to Factory Demo State
  const resetDemoData = () => {
    localStorage.clear();
    setServices(INITIAL_SERVICES);
    setTeam(INITIAL_TEAM);
    setPackages(INITIAL_PACKAGES);
    setBlogs(INITIAL_BLOGS);
    setBeforeAfter(INITIAL_BEFORE_AFTER);
    setGallery(INITIAL_GALLERY);
    setReviews(INITIAL_TESTIMONIALS);
    setAppointments(INITIAL_APPOINTMENTS);
    setCustomers(INITIAL_CUSTOMERS);
    setPayments(INITIAL_PAYMENTS);
    setCoupons(INITIAL_COUPONS);
    setFaqs(INITIAL_FAQS);
    setSettings(DEFAULT_SETTINGS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setFavorites(['hydrafacial-elite', 'profhilo-bio-remodeling']);
    toast.success('All demo data restored to initial state.');
  };

  return (
    <AppContext.Provider value={{
      services,
      team,
      packages,
      blogs,
      beforeAfter,
      gallery,
      reviews,
      appointments,
      customers,
      payments,
      coupons,
      faqs,
      settings,
      notifications,
      favorites,

      // Actions
      bookAppointment,
      updateAppointmentStatus,
      rescheduleAppointment,
      cancelAppointment,
      addService,
      updateService,
      deleteService,
      addStaff,
      updateStaff,
      deleteStaff,
      submitReview,
      updateReviewStatus,
      toggleFeatureReview,
      addBlog,
      updateBlog,
      deleteBlog,
      applyCoupon,
      addCoupon,
      deleteCoupon,
      updateCustomer,
      addCustomer,
      toggleFavorite,
      isFavorite,
      updateSettings,
      addNotification,
      markNotificationRead,
      markAllNotificationsRead,
      resetDemoData
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
