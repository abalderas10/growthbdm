export type UserStatus = 'active' | 'inactive' | 'pending';
export type BillingStatus = 'paid' | 'pending' | 'overdue';
export type BillingPlan = 'basic' | 'premium' | 'enterprise';

export interface UserBilling {
  plan: BillingPlan;
  status: BillingStatus;
  nextBillingDate: Date;
  amount: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  position: string;
  company: string;
  project: string;
  status: UserStatus;
  billing: UserBilling;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
  phoneNumber?: string;
  notes?: string;
}
