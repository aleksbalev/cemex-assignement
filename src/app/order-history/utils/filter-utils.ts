import { Order, OrderStatusEnum } from '../../shared/interfaces';
import {
  DateRangeSpecification,
  ProductLineSpecification,
  SearchSpecification,
  StatusSpecification,
  TrueSpecification,
} from '../../shared/utils/specification/concrete-specifications';
import { Specification } from '../../shared/utils/specification/specification';
import { FilterPanelFormState } from '../interfaces/filter-panel';

/**
 * Filters a list of orders based on various criteria such as status, product line, date range, and search term.
 * This function uses the Specification Pattern to dynamically construct and combine filtering criteria.
 *
 * @param {string} search - The search term to filter orders by order number.
 * @param {FilterPanelFormState} filters - The filters object containing status, product line, and date range filters.
 * @param {Order[]} orders - The list of orders to be filtered.
 * @returns {Order[]} - The filtered list of orders that match the specified criteria.
 *
 */
export function applyOrdersFilters(
  search: string,
  filters: FilterPanelFormState,
  orders: Order[],
): Order[] {
  let specification: Specification<Order> = new TrueSpecification<Order>();

  const { pending, inProgress, completed } = filters.statuses || {};

  if (pending && completed && inProgress) {
    // Show all
    let statusSpecification = new StatusSpecification(OrderStatusEnum.Pending)
      .or(new StatusSpecification(OrderStatusEnum.Completed))
      .or(new StatusSpecification(OrderStatusEnum.InProgress));
    specification = specification.and(statusSpecification);
  } else if (pending && completed) {
    // Show only Pending and Completed, hide InProgress
    let statusSpecification = new StatusSpecification(
      OrderStatusEnum.Pending,
    ).or(new StatusSpecification(OrderStatusEnum.Completed));
    specification = specification.and(statusSpecification);
  } else if (completed && inProgress) {
    // Show only Completed and InProgress, hide Pending
    let statusSpecification = new StatusSpecification(
      OrderStatusEnum.Completed,
    ).or(new StatusSpecification(OrderStatusEnum.InProgress));
    specification = specification.and(statusSpecification);
  } else if (inProgress && pending) {
    // Show only Pending and InProgress, hide Completed
    let statusSpecification = new StatusSpecification(
      OrderStatusEnum.Pending,
    ).or(new StatusSpecification(OrderStatusEnum.InProgress));
    specification = specification.and(statusSpecification);
  } else if (pending) {
    // Show only Pending
    specification = specification.and(
      new StatusSpecification(OrderStatusEnum.Pending),
    );
  } else if (inProgress) {
    // Show only InProgress
    specification = specification.and(
      new StatusSpecification(OrderStatusEnum.InProgress),
    );
  } else if (completed) {
    // Show only Completed
    specification = specification.and(
      new StatusSpecification(OrderStatusEnum.Completed),
    );
  }

  if (filters.productLine) {
    specification = specification.and(
      new ProductLineSpecification(filters.productLine),
    );
  }
  if (filters.dateRange?.from && filters.dateRange.to) {
    specification = specification.and(
      new DateRangeSpecification(filters.dateRange.from, filters.dateRange.to),
    );
  }
  if (search) {
    specification = specification.and(new SearchSpecification(search));
  }

  return orders.filter((order) => specification.isSatisfiedBy(order));
}
