import { Order } from '../../../shared/interfaces';

export const COLUMN_NAME: { [key in Exclude<keyof Order, 'id'>]: string } = {
  status: 'Status',
  orderNumber: 'Order Number',
  productLine: 'Product Line',
  product: 'Product',
  quantity: 'Quantity',
  requestDate: 'Date Requested',
};
