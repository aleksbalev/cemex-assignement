export enum OrderStatusEnum {
  Pending,
  InProgress,
  Completed,
}

export interface Order {
  id: number;
  status: OrderStatusEnum;
  orderNumber: number;
  productLine: string;
  product: string;
  quantity: string;
  requestDate: Date;
}

export type OrderKeys = Array<Exclude<keyof Order, 'id'>>;
