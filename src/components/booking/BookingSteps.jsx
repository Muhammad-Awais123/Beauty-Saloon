import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  CreditCard, 
  ShieldCheck, 
  Sparkles, 
  Tag, 
  CheckCircle2, 
  Download,
  Share2,
  CalendarPlus,
  ArrowRight
} from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';
import Select from '../common/Select';
import Badge from '../common/Badge';

export default function BookingWizard() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { services, team, packages, bookAppointment, applyCoupon, settings } = useApp();
  const { currentUser, isAuthenticated } = useAuth();

  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Booking State
  const [selectedService, setSelectedService] = useState(null);
  const [selectedSpecialist, setSelectedSpecialist] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  
  // Customer Info State
  const [customerData, setCustomerData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: '+1 (555) 234-5678',
    notes: '',
    medicalAlerts: ''
  });

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '4242 •••• •••• 4242',
    expiry: '12/28',
    cvv: '888',
    nameOnCard: currentUser?.name || 'Emily Watson'
  });

  // Confirmed Appointment Result
  const [completedBooking, setCompletedBooking] = useState(null);

  // Prefill from URL queries (e.g. ?service=pico-laser-toning or ?specialist=dr-marcus-chen)
  useEffect(() => {
    const serviceParam = searchParams.get('service');
    const specialistParam = searchParams.get('specialist');
    const packageParam = searchParams.get('package');

    if (serviceParam) {
      const foundSrv = services.find(s => s.id === serviceParam);
      if (foundSrv) setSelectedService(foundSrv);
    } else if (packageParam) {
      const foundPkg = packages.find(p => p.id === packageParam);
      if (foundPkg) {
        setSelectedService({
          id: foundPkg.id,
          name: foundPkg.name,
          category: 'Package Experience',
          duration: foundPkg.duration,
          price: foundPkg.price,
          image: foundPkg.image
        });
      }
    }

    if (specialistParam) {
      const foundSpec = team.find(t => t.id === specialistParam);
      if (foundSpec) setSelectedSpecialist(foundSpec);
    }
  }, [searchParams, services, team, packages]);

  // Update customer data if auth changes
  useEffect(() => {
    if (currentUser && !customerData.name) {
      setCustomerData(prev => ({
        ...prev,
        name: currentUser.name || '',
        email: currentUser.email || ''
      }));
    }
  }, [currentUser]);

  // Pricing calculations
  const basePrice = selectedService?.price || 0;
  const finalPrice = Math.max(0, basePrice - discountAmount);

  // Available Time Slots
  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:15 AM', '01:30 PM', '02:45 PM', '04:00 PM', '05:15 PM'
  ];

  // Helper next / back validations
  const handleNext = () => {
    if (step === 1) {
      if (!selectedService) {
        toast.error('Please choose a treatment to proceed.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!selectedSpecialist) {
        // Default to first available doctor if none selected
        setSelectedSpecialist(team[0]);
      }
      setStep(3);
    } else if (step === 3) {
      if (!selectedDate) {
        toast.error('Please pick an appointment date.');
        return;
      }
      setStep(4);
    } else if (step === 4) {
      if (!selectedTime) {
        toast.error('Please select an available time slot.');
        return;
      }
      setStep(5);
    } else if (step === 5) {
      if (!customerData.name || !customerData.email || !customerData.phone) {
        toast.error('Please complete your contact details.');
        return;
      }
      setStep(6);
    } else if (step === 6) {
      // Finalize booking
      const result = bookAppointment({
        customerId: currentUser?.id || 'cust-01',
        customerName: customerData.name,
        customerEmail: customerData.email,
        customerPhone: customerData.phone,
        serviceId: selectedService.id,
        serviceName: selectedService.name,
        specialistId: selectedSpecialist?.id || team[0].id,
        specialistName: selectedSpecialist?.name || team[0].name,
        date: selectedDate,
        time: selectedTime,
        duration: selectedService.duration || '60 mins',
        price: basePrice,
        discount: discountAmount,
        couponCode: appliedCoupon?.code || '',
        total: finalPrice,
        paymentMethod: paymentMethod,
        notes: customerData.notes
      });

      setCompletedBooking(result);
      setStep(7);
    }
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput) return;
    const res = applyCoupon(couponInput, basePrice);
    if (res.valid) {
      setAppliedCoupon(res.coupon);
      setDiscountAmount(res.discount);
    }
  };

  // Generate date options for the next 14 days
  const today = new Date();
  const dateOptions = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(today.getDate() + i + 1);
    const dateStr = d.toISOString().split('T')[0];
    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
    const monthName = d.toLocaleDateString('en-US', { month: 'short' });
    const dayNum = d.getDate();
    return { dateStr, dayName, monthName, dayNum };
  });

  const stepTitles = [
    'Treatment',
    'Specialist',
    'Date',
    'Time Slot',
    'Your Info',
    'Payment',
    'Confirmed'
  ];

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6">
      
      {/* Step Progress Indicator (Steps 1 to 6) */}
      {step < 7 && (
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-charcoal-200 -translate-y-1/2 z-0" />
            <div
              className="absolute top-1/2 left-0 h-0.5 bg-clinic-700 -translate-y-1/2 z-0 transition-all duration-300"
              style={{ width: `${((step - 1) / 5) * 100}%` }}
            />

            {stepTitles.slice(0, 6).map((title, i) => {
              const stepNum = i + 1;
              const isDone = step > stepNum;
              const isCurrent = step === stepNum;

              return (
                <div key={i} className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isDone
                        ? 'bg-clinic-700 text-white shadow-sm'
                        : isCurrent
                        ? 'bg-white text-clinic-800 border-2 border-clinic-700 shadow-card'
                        : 'bg-white text-charcoal-400 border border-charcoal-200'
                    }`}
                  >
                    {isDone ? <Check className="w-4 h-4" /> : stepNum}
                  </div>
                  <span className={`text-[10px] sm:text-xs mt-1.5 font-medium hidden sm:block ${
                    isCurrent ? 'text-clinic-800 font-bold' : isDone ? 'text-charcoal-700' : 'text-charcoal-400'
                  }`}>
                    {title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP CONTAINER */}
      <div className="bg-white rounded-2xl border border-charcoal-200 shadow-elevated overflow-hidden text-left">
        
        {/* STEP 1: SELECT TREATMENT */}
        {step === 1 && (
          <div className="p-6 sm:p-8">
            <div className="mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-clinic-700 block mb-1">Step 1 of 6</span>
              <h2 className="text-2xl font-serif font-bold text-charcoal-900">Select Your Aesthetic Treatment</h2>
              <p className="text-xs text-charcoal-500 mt-1">Choose the dermatological or aesthetic procedure you would like to book.</p>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 mb-6">
              {['All', 'Skin Treatments', 'Facial Treatments', 'Laser Treatments', 'Hair Treatments', 'Body Treatments', 'Anti-Aging', 'Wellness'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                    selectedCategory === cat
                      ? 'bg-clinic-700 text-white'
                      : 'bg-surface-muted text-charcoal-700 hover:bg-charcoal-100 border border-charcoal-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Service Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[450px] overflow-y-auto pr-1">
              {services
                .filter(s => selectedCategory === 'All' || s.category === selectedCategory)
                .map((srv) => {
                  const isSelected = selectedService?.id === srv.id;
                  return (
                    <div
                      key={srv.id}
                      onClick={() => setSelectedService(srv)}
                      className={`cursor-pointer p-4 rounded-xl border transition-all flex gap-3.5 items-start ${
                        isSelected
                          ? 'border-clinic-700 bg-clinic-50/70 ring-1 ring-clinic-700'
                          : 'border-charcoal-200 hover:border-charcoal-300 bg-white'
                      }`}
                    >
                      <img
                        src={srv.image}
                        alt={srv.name}
                        className="w-16 h-16 rounded-lg object-cover shrink-0 border border-charcoal-200"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[10px] font-semibold text-clinic-800 bg-clinic-100 px-2 py-0.5 rounded">
                            {srv.category}
                          </span>
                          <span className="text-sm font-bold font-serif text-clinic-900">${srv.price}</span>
                        </div>
                        <h4 className="text-sm font-bold text-charcoal-900 mt-1 line-clamp-1">{srv.name}</h4>
                        <p className="text-[11px] text-charcoal-500 line-clamp-1 mt-0.5">{srv.shortDesc}</p>
                        <span className="text-[10px] text-charcoal-400 mt-1 block">Duration: {srv.duration}</span>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-1 ${
                        isSelected ? 'bg-clinic-700 border-clinic-700 text-white' : 'border-charcoal-300'
                      }`}>
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* STEP 2: SELECT SPECIALIST */}
        {step === 2 && (
          <div className="p-6 sm:p-8">
            <div className="mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-clinic-700 block mb-1">Step 2 of 6</span>
              <h2 className="text-2xl font-serif font-bold text-charcoal-900">Select Your Medical Specialist</h2>
              <p className="text-xs text-charcoal-500 mt-1">
                Choose a board-certified dermatologist or aesthetic physician for {selectedService?.name}.
              </p>
            </div>

            {/* Any Available Specialist Option */}
            <div
              onClick={() => setSelectedSpecialist({ id: 'any', name: 'First Available Specialist', role: 'Clinical Team Recommendation', image: '/images/team/team-doctor-01.jpg' })}
              className={`cursor-pointer p-4 mb-4 rounded-xl border transition-all flex items-center justify-between ${
                selectedSpecialist?.id === 'any'
                  ? 'border-clinic-700 bg-clinic-50/70 ring-1 ring-clinic-700'
                  : 'border-charcoal-200 hover:border-charcoal-300 bg-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-clinic-100 text-clinic-800 flex items-center justify-center font-bold">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-charcoal-900">First Available Specialist</h4>
                  <p className="text-xs text-charcoal-500">Fastest booking allocation according to doctor availability.</p>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                selectedSpecialist?.id === 'any' ? 'bg-clinic-700 border-clinic-700 text-white' : 'border-charcoal-300'
              }`}>
                {selectedSpecialist?.id === 'any' && <Check className="w-3 h-3" />}
              </div>
            </div>

            {/* Specialist Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {team.map((doc) => {
                const isSelected = selectedSpecialist?.id === doc.id;
                return (
                  <div
                    key={doc.id}
                    onClick={() => setSelectedSpecialist(doc)}
                    className={`cursor-pointer p-4 rounded-xl border transition-all flex gap-3.5 items-start ${
                      isSelected
                        ? 'border-clinic-700 bg-clinic-50/70 ring-1 ring-clinic-700'
                        : 'border-charcoal-200 hover:border-charcoal-300 bg-white'
                    }`}
                  >
                    <img
                      src={doc.image}
                      alt={doc.name}
                      className="w-14 h-14 rounded-full object-cover shrink-0 border border-charcoal-200"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-charcoal-900">{doc.name}</h4>
                      <p className="text-xs text-clinic-700 font-medium">{doc.role}</p>
                      <p className="text-[11px] text-charcoal-400 mt-1">{doc.experience}</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-1 ${
                      isSelected ? 'bg-clinic-700 border-clinic-700 text-white' : 'border-charcoal-300'
                    }`}>
                      {isSelected && <Check className="w-3 h-3" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: SELECT DATE */}
        {step === 3 && (
          <div className="p-6 sm:p-8">
            <div className="mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-clinic-700 block mb-1">Step 3 of 6</span>
              <h2 className="text-2xl font-serif font-bold text-charcoal-900">Choose Appointment Date</h2>
              <p className="text-xs text-charcoal-500 mt-1">Select an upcoming open date at our Lexington Avenue clinic.</p>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3 mb-6">
              {dateOptions.map((opt) => {
                const isSelected = selectedDate === opt.dateStr;
                return (
                  <button
                    key={opt.dateStr}
                    type="button"
                    onClick={() => setSelectedDate(opt.dateStr)}
                    className={`p-3.5 rounded-xl border flex flex-col items-center justify-center transition-all ${
                      isSelected
                        ? 'border-clinic-700 bg-clinic-700 text-white shadow-card'
                        : 'border-charcoal-200 hover:border-charcoal-300 bg-white text-charcoal-800'
                    }`}
                  >
                    <span className={`text-[11px] uppercase font-semibold ${isSelected ? 'text-clinic-200' : 'text-charcoal-400'}`}>
                      {opt.dayName}
                    </span>
                    <span className="text-xl font-bold font-serif my-0.5">
                      {opt.dayNum}
                    </span>
                    <span className={`text-[10px] ${isSelected ? 'text-clinic-200' : 'text-charcoal-500'}`}>
                      {opt.monthName}
                    </span>
                  </button>
                );
              })}
            </div>

            {selectedDate && (
              <div className="p-3.5 rounded-lg bg-surface-soft border border-charcoal-200 text-xs text-charcoal-700 flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-clinic-700" />
                <span>Selected Date: <strong>{new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</strong></span>
              </div>
            )}
          </div>
        )}

        {/* STEP 4: SELECT TIME SLOT */}
        {step === 4 && (
          <div className="p-6 sm:p-8">
            <div className="mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-clinic-700 block mb-1">Step 4 of 6</span>
              <h2 className="text-2xl font-serif font-bold text-charcoal-900">Select Available Time Slot</h2>
              <p className="text-xs text-charcoal-500 mt-1">
                Open slots on {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} with {selectedSpecialist?.name}.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {timeSlots.map((slot) => {
                const isSelected = selectedTime === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedTime(slot)}
                    className={`p-3.5 rounded-xl border text-center transition-all ${
                      isSelected
                        ? 'border-clinic-700 bg-clinic-700 text-white shadow-card font-bold'
                        : 'border-charcoal-200 hover:border-clinic-500 bg-white text-charcoal-800 text-xs font-semibold'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-1.5">
                      <Clock className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-clinic-700'}`} />
                      <span>{slot}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 5: CUSTOMER INFORMATION */}
        {step === 5 && (
          <div className="p-6 sm:p-8">
            <div className="mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-clinic-700 block mb-1">Step 5 of 6</span>
              <h2 className="text-2xl font-serif font-bold text-charcoal-900">Patient Details & Medical Notes</h2>
              <p className="text-xs text-charcoal-500 mt-1">Provide your contact info for appointment confirmation & preparation reminders.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <Input
                label="Full Name"
                required
                value={customerData.name}
                onChange={(e) => setCustomerData({ ...customerData, name: e.target.value })}
                placeholder="e.g. Emily Watson"
              />
              <Input
                label="Email Address"
                type="email"
                required
                value={customerData.email}
                onChange={(e) => setCustomerData({ ...customerData, email: e.target.value })}
                placeholder="e.g. customer@demo.com"
              />
              <Input
                label="Phone Number"
                type="tel"
                required
                value={customerData.phone}
                onChange={(e) => setCustomerData({ ...customerData, phone: e.target.value })}
                placeholder="+1 (555) 000-0000"
              />
              <Input
                label="Known Allergies / Skin Sensitivity"
                value={customerData.medicalAlerts}
                onChange={(e) => setCustomerData({ ...customerData, medicalAlerts: e.target.value })}
                placeholder="e.g. Sensitive to glycolic acid, None"
              />
            </div>

            <div className="text-left">
              <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1.5">
                Special Requests / Goals
              </label>
              <textarea
                rows={3}
                value={customerData.notes}
                onChange={(e) => setCustomerData({ ...customerData, notes: e.target.value })}
                placeholder="Describe any particular concerns or questions for the doctor..."
                className="w-full rounded-lg border border-charcoal-200 p-3 text-xs text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-clinic-600"
              />
            </div>
          </div>
        )}

        {/* STEP 6: PAYMENT METHOD & REVIEW */}
        {step === 6 && (
          <div className="p-6 sm:p-8">
            <div className="mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-clinic-700 block mb-1">Step 6 of 6</span>
              <h2 className="text-2xl font-serif font-bold text-charcoal-900">Review & Payment Simulation</h2>
              <p className="text-xs text-charcoal-500 mt-1">Review your clinical booking details and select your simulated payment preference.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Payment Methods */}
              <div className="lg:col-span-2 space-y-4">
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1.5">
                    Select Payment Method
                  </label>
                  
                  {['Credit Card', 'Apple Pay', 'Pay at Clinic'].map((method) => (
                    <label
                      key={method}
                      className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                        paymentMethod === method
                          ? 'border-clinic-700 bg-clinic-50/70 ring-1 ring-clinic-700'
                          : 'border-charcoal-200 hover:border-charcoal-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={paymentMethod === method}
                          onChange={() => setPaymentMethod(method)}
                          className="text-clinic-700 focus:ring-clinic-600"
                        />
                        <span className="text-sm font-semibold text-charcoal-900">{method}</span>
                      </div>
                      <span className="text-xs text-charcoal-400">
                        {method === 'Pay at Clinic' ? 'Pay upon arrival' : 'Instant confirmation'}
                      </span>
                    </label>
                  ))}
                </div>

                {paymentMethod === 'Credit Card' && (
                  <div className="p-4 rounded-xl bg-surface-soft border border-charcoal-200 space-y-3">
                    <p className="text-xs font-semibold text-charcoal-700 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-clinic-700" />
                      Simulated 256-Bit Encrypted Card Payment
                    </p>
                    <Input
                      label="Card Number"
                      value={cardDetails.cardNumber}
                      onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        label="Expiry Date"
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                      />
                      <Input
                        label="CVV"
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                      />
                    </div>
                  </div>
                )}

                {/* Promo Code Box */}
                <form onSubmit={handleApplyCoupon} className="pt-2">
                  <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1.5">
                    Have a Promotion Code? (Try: WELCOME20 or GLOW50)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      placeholder="e.g. WELCOME20"
                      className="rounded-lg border border-charcoal-200 px-3.5 py-2 text-xs uppercase font-bold text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-clinic-600 w-full"
                    />
                    <Button type="submit" variant="secondary" size="sm" icon={Tag}>
                      Apply
                    </Button>
                  </div>
                </form>
              </div>

              {/* Order Summary Box */}
              <div className="p-5 rounded-xl bg-surface-muted border border-charcoal-200 flex flex-col justify-between">
                <div>
                  <h4 className="font-serif font-bold text-base text-charcoal-900 border-b border-charcoal-200 pb-3 mb-3">
                    Appointment Summary
                  </h4>

                  <div className="space-y-2.5 text-xs text-charcoal-600">
                    <div className="flex justify-between">
                      <span className="text-charcoal-400">Treatment:</span>
                      <strong className="text-charcoal-900 text-right">{selectedService?.name}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-charcoal-400">Doctor:</span>
                      <span className="text-charcoal-800 text-right">{selectedSpecialist?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-charcoal-400">Date:</span>
                      <span className="text-charcoal-800 text-right">{selectedDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-charcoal-400">Time:</span>
                      <span className="text-charcoal-800 text-right">{selectedTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-charcoal-400">Duration:</span>
                      <span className="text-charcoal-800">{selectedService?.duration}</span>
                    </div>

                    <div className="pt-3 border-t border-charcoal-200 space-y-1.5">
                      <div className="flex justify-between text-charcoal-600">
                        <span>Subtotal:</span>
                        <span>${basePrice}</span>
                      </div>
                      {appliedCoupon && (
                        <div className="flex justify-between text-emerald-700 font-semibold">
                          <span>Discount ({appliedCoupon.code}):</span>
                          <span>-${discountAmount}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm font-bold text-charcoal-900 pt-2 border-t border-charcoal-200">
                        <span>Total Due:</span>
                        <span className="text-lg font-serif text-clinic-900">${finalPrice}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-charcoal-200 text-[11px] text-charcoal-500 leading-snug">
                  Zero cancellation fee up to 24h before appointment.
                </div>
              </div>

            </div>
          </div>
        )}

        {/* STEP 7: CONFIRMATION SCREEN */}
        {step === 7 && completedBooking && (
          <div className="p-8 sm:p-10 text-center">
            <div className="w-16 h-16 rounded-full bg-clinic-100 text-clinic-700 flex items-center justify-center mx-auto mb-4 border border-clinic-200 shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold uppercase tracking-wider mb-2">
              Booking Successfully Confirmed
            </span>

            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-charcoal-900 mb-2">
              We Look Forward to Welcoming You
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-500 max-w-md mx-auto mb-6">
              A calendar invite and preparation guide have been simulated and registered to your patient profile.
            </p>

            {/* Booking Receipt Card */}
            <div className="max-w-lg mx-auto bg-surface-soft rounded-xl border border-charcoal-200 p-6 text-left mb-8 shadow-card">
              <div className="flex items-center justify-between border-b border-charcoal-200 pb-3 mb-4">
                <div>
                  <span className="text-[10px] uppercase font-semibold text-charcoal-400 block">Booking Reference</span>
                  <span className="text-base font-bold font-mono text-clinic-900">{completedBooking.bookingId}</span>
                </div>
                <Badge variant="success" size="sm">
                  {completedBooking.paymentStatus.toUpperCase()}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                <div>
                  <span className="text-charcoal-400 block">Service:</span>
                  <span className="font-semibold text-charcoal-900">{completedBooking.serviceName}</span>
                </div>
                <div>
                  <span className="text-charcoal-400 block">Specialist:</span>
                  <span className="font-semibold text-charcoal-900">{completedBooking.specialistName}</span>
                </div>
                <div>
                  <span className="text-charcoal-400 block">Scheduled Time:</span>
                  <span className="font-semibold text-charcoal-900">{completedBooking.date} at {completedBooking.time}</span>
                </div>
                <div>
                  <span className="text-charcoal-400 block">Total Amount:</span>
                  <span className="font-bold text-clinic-900 font-serif text-sm">${completedBooking.total}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-charcoal-200 flex items-center justify-between text-[11px] text-charcoal-500">
                <span>Location: 450 Lexington Ave, Suite 1800</span>
                <span>Txn ID: {completedBooking.transactionId}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button
                variant="outline"
                size="md"
                icon={CalendarPlus}
                onClick={() => toast.success('Calendar .ics event downloaded!')}
              >
                Add to Calendar
              </Button>
              <Button
                to="/dashboard/appointments"
                variant="primary"
                size="md"
                icon={ArrowRight}
                iconPosition="right"
              >
                View in Customer Dashboard
              </Button>
            </div>
          </div>
        )}

        {/* BOTTOM NAVIGATION CONTROLS (Steps 1-6) */}
        {step < 7 && (
          <div className="bg-surface-soft px-6 py-4 border-t border-charcoal-100 flex items-center justify-between">
            {step > 1 ? (
              <Button
                variant="outline"
                size="sm"
                icon={ChevronLeft}
                onClick={() => setStep(step - 1)}
              >
                Back
              </Button>
            ) : <div />}

            <Button
              variant="primary"
              size="md"
              icon={step === 6 ? CheckCircle2 : ChevronRight}
              iconPosition="right"
              onClick={handleNext}
            >
              {step === 6 ? 'Confirm & Book Appointment' : 'Continue to Next Step'}
            </Button>
          </div>
        )}

      </div>
    </div>
  );
}
