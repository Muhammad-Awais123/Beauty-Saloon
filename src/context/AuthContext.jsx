import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const AuthContext = createContext(null);

const DEMO_ACCOUNTS = {
  admin: {
    id: 'admin-01',
    name: 'Dr. Elena Vance (Admin)',
    email: 'admin@demo.com',
    role: 'admin',
    avatar: '/images/team/team-doctor-01.jpg'
  },
  customer: {
    id: 'cust-01',
    name: 'Emily Watson',
    email: 'customer@demo.com',
    role: 'customer',
    avatar: '/images/team/team-doctor-03.jpg',
    membershipTier: 'Platinum Elite',
    loyaltyPoints: 340
  }
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('elan_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('elan_auth_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('elan_auth_user');
    }
  }, [currentUser]);

  const login = (email, password, expectedRole = null) => {
    const cleanEmail = email.trim().toLowerCase();
    
    if (cleanEmail === 'admin@demo.com' && password === 'admin123') {
      const adminUser = DEMO_ACCOUNTS.admin;
      setCurrentUser(adminUser);
      toast.success(`Welcome back, ${adminUser.name}! (Admin Portal)`);
      return { success: true, user: adminUser };
    }

    if (cleanEmail === 'customer@demo.com' && password === 'customer123') {
      const customerUser = DEMO_ACCOUNTS.customer;
      setCurrentUser(customerUser);
      toast.success(`Welcome back, ${customerUser.name}!`);
      return { success: true, user: customerUser };
    }

    // Allow flexible test logins if they provide email
    if (cleanEmail && password.length >= 4) {
      const fallbackRole = expectedRole || (cleanEmail.includes('admin') ? 'admin' : 'customer');
      const newUser = {
        id: 'user-' + Date.now(),
        name: cleanEmail.split('@')[0].replace('.', ' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase()),
        email: cleanEmail,
        role: fallbackRole,
        avatar: fallbackRole === 'admin' ? '/images/team/team-doctor-01.jpg' : '/images/team/team-doctor-03.jpg',
        membershipTier: 'Silver Member',
        loyaltyPoints: 100
      };
      setCurrentUser(newUser);
      toast.success(`Signed in as ${newUser.name}`);
      return { success: true, user: newUser };
    }

    toast.error('Invalid credentials. Use demo accounts or valid email + password.');
    return { success: false, error: 'Invalid credentials' };
  };

  const logout = () => {
    setCurrentUser(null);
    toast.info('Logged out successfully.');
  };

  const quickSwitch = (role) => {
    if (role === 'admin') {
      setCurrentUser(DEMO_ACCOUNTS.admin);
      toast.success('Switched to Demo Admin Mode');
    } else if (role === 'customer') {
      setCurrentUser(DEMO_ACCOUNTS.customer);
      toast.success('Switched to Demo Customer Mode');
    } else {
      setCurrentUser(null);
      toast.info('Switched to Guest Visitor Mode');
    }
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      isAuthenticated: !!currentUser,
      isAdmin: currentUser?.role === 'admin',
      isCustomer: currentUser?.role === 'customer',
      login,
      logout,
      quickSwitch
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
