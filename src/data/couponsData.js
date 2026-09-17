export const INITIAL_COUPONS = [
  {
    id: 'coup-01',
    code: 'WELCOME20',
    description: '20% off your first clinical aesthetic booking',
    discountType: 'percentage', // percentage | fixed
    discountValue: 20,
    minSpend: 150,
    expiryDate: '2026-12-31',
    usageLimit: 500,
    timesUsed: 142,
    status: 'active'
  },
  {
    id: 'coup-02',
    code: 'GLOW50',
    description: '$50 off any Signature Treatment or Package above $300',
    discountType: 'fixed',
    discountValue: 50,
    minSpend: 300,
    expiryDate: '2026-10-31',
    usageLimit: 200,
    timesUsed: 88,
    status: 'active'
  },
  {
    id: 'coup-03',
    code: 'VIPSUMMER',
    description: '15% summer rejuvenation VIP discount',
    discountType: 'percentage',
    discountValue: 15,
    minSpend: 200,
    expiryDate: '2026-08-31',
    usageLimit: 150,
    timesUsed: 150,
    status: 'expired'
  }
];
