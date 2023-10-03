import { Book } from '../books/book.model';

export interface CartOrder {
  id: number;
  books: Book[];
  userId: number;
  customerName: string;
  customerSurename: string;
  customerStreet: string;
  customerStreetNumber: number;
  customerCity: string;
  customerZipCode: number;
  customerPhone: string;
  customerEmail: string;
  paymentMethod: PaymentMethod;
  customerNote?: string;
  date: Date;
  status: OrderStatus;
  totalPrice: number;
}

export enum OrderStatus {
  Received = 'Pristiglo',
  InProgress = 'U toku',
  Cancelled = 'Otkazano',
}

export enum PaymentMethod {
  Cash = 'Pouzećem',
  CreditCard = 'Platnom karticom',
  BankAccount = 'Preko racuna',
}
