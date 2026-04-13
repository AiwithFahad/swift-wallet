export interface Transaction {
  id: string;
  type: 'sent' | 'received';
  name: string;
  email: string;
  amount: number;
  status: 'success' | 'pending' | 'failed';
  date: string;
  note?: string;
}

export interface Notification {
  id: string;
  type: 'money_received' | 'money_sent' | 'login_alert' | 'security';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export const mockUser = {
  id: 'usr_1a2b3c4d',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  avatar: null,
  balance: 12847.53,
  currency: 'USD',
  createdAt: '2024-01-15',
  twoFactorEnabled: true,
};

export const mockTransactions: Transaction[] = [
  { id: 'txn_001', type: 'received', name: 'Sarah Miller', email: 'sarah@example.com', amount: 2500.00, status: 'success', date: '2026-04-13T10:30:00', note: 'Project payment' },
  { id: 'txn_002', type: 'sent', name: 'Netflix', email: 'billing@netflix.com', amount: 15.99, status: 'success', date: '2026-04-12T14:20:00', note: 'Monthly subscription' },
  { id: 'txn_003', type: 'received', name: 'John Davis', email: 'john@example.com', amount: 450.00, status: 'success', date: '2026-04-11T09:15:00', note: 'Dinner split' },
  { id: 'txn_004', type: 'sent', name: 'Amazon', email: 'orders@amazon.com', amount: 89.99, status: 'pending', date: '2026-04-10T16:45:00', note: 'Electronics' },
  { id: 'txn_005', type: 'sent', name: 'Emily Chen', email: 'emily@example.com', amount: 175.00, status: 'success', date: '2026-04-09T11:00:00', note: 'Birthday gift' },
  { id: 'txn_006', type: 'received', name: 'Freelance Inc', email: 'pay@freelance.com', amount: 3200.00, status: 'success', date: '2026-04-08T08:30:00', note: 'Invoice #1247' },
  { id: 'txn_007', type: 'sent', name: 'Uber', email: 'receipts@uber.com', amount: 24.50, status: 'success', date: '2026-04-07T22:10:00' },
  { id: 'txn_008', type: 'sent', name: 'Michael Brown', email: 'mike@example.com', amount: 500.00, status: 'failed', date: '2026-04-06T13:00:00', note: 'Insufficient funds' },
];

export const mockNotifications: Notification[] = [
  { id: 'n1', type: 'money_received', title: 'Money Received', message: 'Sarah Miller sent you $2,500.00', time: '2 hours ago', read: false },
  { id: 'n2', type: 'money_sent', title: 'Payment Sent', message: 'You sent $15.99 to Netflix', time: '1 day ago', read: false },
  { id: 'n3', type: 'login_alert', title: 'New Login', message: 'New login from Chrome on macOS', time: '2 days ago', read: true },
  { id: 'n4', type: 'security', title: 'Security Update', message: '2FA has been enabled on your account', time: '3 days ago', read: true },
];

export const mockChartData = [
  { month: 'Oct', income: 4200, spending: 2800 },
  { month: 'Nov', income: 5100, spending: 3200 },
  { month: 'Dec', income: 3800, spending: 4100 },
  { month: 'Jan', income: 6200, spending: 2900 },
  { month: 'Feb', income: 4800, spending: 3500 },
  { month: 'Mar', income: 7100, spending: 3100 },
  { month: 'Apr', income: 5650, spending: 2400 },
];
