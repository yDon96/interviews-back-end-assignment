import {
  IFetchResult,
  PaginationResponse,
} from '../interfaces/pagination.interfaces';

export const getPaginationResponseFrom = (
  value: IFetchResult,
): PaginationResponse => {
  const total_pages = Math.ceil(value.totalElements / value.dataLength);
  const prev_page =
    value.currentOffset - 1 < 1 ? null : Math.max(1, value.currentOffset - 1);
  const next_page =
    value.currentOffset + 1 > total_pages
      ? null
      : Math.min(value.currentOffset + 1, total_pages);
  return {
    total_records: value.totalElements,
    current_page: value.currentOffset,
    total_pages,
    next_page,
    prev_page,
  };
};
