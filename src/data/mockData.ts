import { Account, Transaction, UserProfile, AIInsight } from '../types';

export const mockUser: UserProfile = {
  name: 'Usuario Atrix',
  email: 'usuario@atrix.com',
  tier: 'Private',
  brlEurRate: 5.45,
  isNewUser: false,
};

export const mockAccounts: Account[] = [
  {
    id: 'acc-1',
    name: 'Conta Corrente BR',
    bankName: 'Itau',
    country: 'BR',
    currency: 'BRL',
    balance: 0,
    type: 'Checking',
    accountNumber: '12345-6',
    ibanOrAccount: '12345-6',
    cardLast4: '4321',
    color: '#0B1F3A',
  },
  {
    id: 'acc-2',
    name: 'Conta Corrente PT',
    bankName: 'Millennium BCP',
    country: 'PT',
    currency: 'EUR',
    balance: 0,
    type: 'Checking',
    accountNumber: 'PT50-0000',
    ibanOrAccount: 'PT50000201231234567890154',
    cardLast4: '8765',
    color: '#C9A227',
  },
];

export const mockTransactions: Transaction[] = [];

export const mockInsights: AIInsight[] = [];
