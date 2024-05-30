import { Order, OrderStatusEnum } from '../../interfaces';
import { CompositeSpecification } from './specification';

export class StatusSpecification extends CompositeSpecification<Order> {
  constructor(private status: OrderStatusEnum) {
    super();
  }

  isSatisfiedBy(order: Order): boolean {
    return order.status === this.status;
  }
}

export class ProductLineSpecification extends CompositeSpecification<Order> {
  constructor(private productLine: string) {
    super();
  }

  isSatisfiedBy(order: Order): boolean {
    return order.productLine.includes(this.productLine);
  }
}

export class DateRangeSpecification extends CompositeSpecification<Order> {
  constructor(
    private from: Date,
    private to: Date,
  ) {
    super();
  }

  isSatisfiedBy(order: Order): boolean {
    const orderDate = new Date(order.requestDate);
    return (
      (!this.from || orderDate >= this.from) &&
      (!this.to || orderDate <= this.to)
    );
  }
}

export class SearchSpecification extends CompositeSpecification<Order> {
  constructor(private searchTerm: string) {
    super();
  }

  isSatisfiedBy(order: Order): boolean {
    return `${order.orderNumber}`.includes(this.searchTerm);
  }
}

export class TrueSpecification<T> extends CompositeSpecification<T> {
  isSatisfiedBy(candidate: T): boolean {
    return true;
  }
}
