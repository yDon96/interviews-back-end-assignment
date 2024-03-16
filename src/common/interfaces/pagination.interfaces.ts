export interface PaginationResponse {
  total_records: number;
  current_page: number;
  total_pages: number;
  next_page?: number | null;
  prev_page?: number | null;
}

export interface IFetchResult {
  totalElements: number;
  currentOffset: number;
  dataLength: number;
}
