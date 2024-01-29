export interface OrderStatusModel {
  orderId: number;
  userId?: number;
  firstName?: string;
  lastName?: string;
  streetAdress?: string;
  email?: string;
  phone?: string;
  paymentType?: string;
  country?: string;
  town?: string;
  notes?: string;
  district?: string;
  orderStatus: string;
  amount?: number;
  ordersDetails?: any[];
  user?: any;
}
