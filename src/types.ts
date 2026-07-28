export type CountryFilter = 'ALL' | 'BR' | 'PT';
export type PeriodFilter = 'mensal' | 'semestral' | 'anual' | 'personalizado';

export interface Account {
  id: string;
  name: string;
  bankName: string;
  country: 'BR' | 'PT';
  currency: 'BRL' | 'EUR';
  balance: number;
  type: 'Checking' | 'Savings' | 'Investment';
  accountNumber: string;
  ibanOrAccount: string;
  cardLast4: string;
  color: string;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  currency: 'BRL' | 'EUR';
  country: 'BR' | 'PT';
  category: string;
  accountId?: string;
  accountName: string;
  type: string;
  merchant?: string;
  status?: 'Concluido' | 'Pendente' | 'Falhou';
  notes?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  tier?: string;
  avatarUrl?: string;
  brlEurRate: number;
  isNewUser?: boolean;
}

export interface AIInsight {
  title: string;
  recommendation: string;
  tag: string;
  severity: 'low' | 'medium' | 'high' | 'info';
}

export interface VaultDocument {
  id: string;
  title: string;
  transactionId?: string;
  transactionDescription?: string;
  documentType: string;
  amount?: number;
  currency?: string;
  fileUrl?: string;
  fileName: string;
  fileSize?: string;
  fileType?: string;
  fileData?: string;
  notes?: string;
  uploadedAt: string;
}
