
export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: React.ReactNode;
}

export interface PatientDetails {
  name: string;
  email: string;
  phone: string;
  serviceId: string;
  amount: number;
}

export enum PaymentStatusState {
  IDLE,
  SUCCESS,
  ERROR,
  PENDING
}

export interface PaymentStatus {
  state: PaymentStatusState;
  title: string;
  message: string;
  transactionId?: string;
}

// src/types/types.ts

export interface PaymentOrderRequest {
  name: string;
  email: string;
  phone: string;
  amount: number;
}

export interface PayUOrderResponse {
  key: string;
  txnid: string;
  amount: string;
  productinfo: string;
  firstname: string;
  email: string;
  phone: string;
  surl: string;
  furl: string;
  hash: string;
}
