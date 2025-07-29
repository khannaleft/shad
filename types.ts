
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
