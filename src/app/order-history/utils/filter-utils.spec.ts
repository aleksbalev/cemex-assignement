import { OrderStatusEnum } from '../../shared/interfaces';
import { FilterPanelFormState } from '../interfaces/filter-panel';
import { applyOrdersFilters } from './filter-utils';
import { ordersMock } from './orders.mock';

describe('applyFilters', () => {
  it('should filter by pending status', () => {
    const filters: FilterPanelFormState = {
      statuses: { pending: true, inProgress: false, completed: false },
    };
    const result = applyOrdersFilters('', filters, ordersMock);
    expect(result.length).toBe(2);
    expect(result[0].status).toBe(OrderStatusEnum.Pending);
  });

  it('should filter by inProgress status', () => {
    const filters: FilterPanelFormState = {
      statuses: { pending: false, inProgress: true, completed: false },
    };
    const result = applyOrdersFilters('', filters, ordersMock);
    expect(result.length).toBe(1);
    expect(result[0].status).toBe(OrderStatusEnum.InProgress);
  });

  it('should filter by completed status', () => {
    const filters: FilterPanelFormState = {
      statuses: { pending: false, inProgress: false, completed: true },
    };
    const result = applyOrdersFilters('', filters, ordersMock);
    expect(result.length).toBe(3);
    expect(result[0].status).toBe(OrderStatusEnum.Completed);
  });

  it('should filter by pending and inProgress status', () => {
    const filters: FilterPanelFormState = {
      statuses: { pending: true, inProgress: true, completed: false },
    };
    const result = applyOrdersFilters('', filters, ordersMock);
    expect(result.length).toBe(3);
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ status: OrderStatusEnum.Pending }),
        expect.objectContaining({ status: OrderStatusEnum.InProgress }),
      ]),
    );
  });

  it('should filter by pending and completed status', () => {
    const filters: FilterPanelFormState = {
      statuses: { pending: true, inProgress: false, completed: true },
    };
    const result = applyOrdersFilters('', filters, ordersMock);
    expect(result.length).toBe(5);
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ status: OrderStatusEnum.Pending }),
        expect.objectContaining({ status: OrderStatusEnum.Completed }),
      ]),
    );
  });

  it('should filter by inProgress and completed status', () => {
    const filters: FilterPanelFormState = {
      statuses: { pending: false, inProgress: true, completed: true },
    };
    const result = applyOrdersFilters('', filters, ordersMock);
    expect(result.length).toBe(4);
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ status: OrderStatusEnum.InProgress }),
        expect.objectContaining({ status: OrderStatusEnum.Completed }),
      ]),
    );
  });

  it('should filter by all statuses', () => {
    const filters: FilterPanelFormState = {
      statuses: { pending: true, inProgress: true, completed: true },
    };
    const result = applyOrdersFilters('', filters, ordersMock);
    expect(result.length).toBe(6);
  });

  it('should filter by product line', () => {
    const filters: FilterPanelFormState = {
      productLine: 'Aggregates',
    };
    const result = applyOrdersFilters('', filters, ordersMock);
    expect(result.length).toBe(2);
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ productLine: 'Aggregates' }),
      ]),
    );
  });

  it('should filter by date range', () => {
    const filters: FilterPanelFormState = {
      dateRange: { from: new Date('2022-10-10'), to: new Date('2022-10-20') },
    };
    const result = applyOrdersFilters('', filters, ordersMock);
    expect(result.length).toBe(1);
    expect(result[0].requestDate).toEqual(new Date('2022-10-20 00:00:00'));
  });

  it('should filter by search term', () => {
    const search = '3301';
    const filters: FilterPanelFormState = {};
    const result = applyOrdersFilters(search, filters, ordersMock);
    expect(result.length).toBe(1);
    expect(result[0].orderNumber).toBe(3301);
  });

  it('should filter by multiple criteria', () => {
    const filters: FilterPanelFormState = {
      statuses: { pending: true, inProgress: false, completed: true },
      productLine: 'Cement',
      dateRange: { from: new Date('2022-01-01'), to: new Date('2022-12-31') },
    };
    const result = applyOrdersFilters('29', filters, ordersMock);
    expect(result.length).toBe(1);
    expect(result[0]).toEqual(
      expect.objectContaining({
        id: 5,
        orderNumber: 3295,
        status: OrderStatusEnum.Completed,
        productLine: 'Cement',
        product: 'Gris CPC30R Tolteca Extra 50Kg',
        quantity: '12 TN',
        requestDate: new Date('2022-04-05 00:00:00'),
      }),
    );
  });
});
