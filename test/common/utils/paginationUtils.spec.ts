import { IFetchResult } from '../../../src/common/interfaces/pagination.interfaces';
import { getPaginationResponseFrom } from '../../../src/common/utils/paginationUtils';

describe('GetPaginationResponseFrom Fetched data info', () => {
  it('should return pagination data', () => {
    const dataInfo: IFetchResult = {
      currentOffset: 2,
      dataLength: 3,
      totalElements: 9,
    };
    const expetedValue = {
      total_records: 9,
      current_page: 2,
      total_pages: 3,
      next_page: 3,
      prev_page: 1,
    };
    const result = getPaginationResponseFrom(dataInfo);

    expect(result).toEqual(expetedValue);
  });

  it('If is the first page, should return pagination data with prev_page null', () => {
    const dataInfo: IFetchResult = {
      currentOffset: 1,
      dataLength: 3,
      totalElements: 9,
    };
    const expetedValue = {
      total_records: 9,
      current_page: 1,
      total_pages: 3,
      next_page: 2,
      prev_page: null,
    };
    const result = getPaginationResponseFrom(dataInfo);

    expect(result).toEqual(expetedValue);
  });

  it('If is the last page, should return pagination data with next_page null', () => {
    const dataInfo: IFetchResult = {
      currentOffset: 3,
      dataLength: 3,
      totalElements: 9,
    };
    const expetedValue = {
      total_records: 9,
      current_page: 3,
      total_pages: 3,
      next_page: null,
      prev_page: 2,
    };
    const result = getPaginationResponseFrom(dataInfo);

    expect(result).toEqual(expetedValue);
  });

  it('If total element are larger than a multiple of the data length, should return pagination data with total_pages calculated in excess', () => {
    const dataInfo: IFetchResult = {
      currentOffset: 3,
      dataLength: 3,
      totalElements: 10,
    };
    const expetedValue = {
      total_records: 10,
      current_page: 3,
      total_pages: 4,
      next_page: 4,
      prev_page: 2,
    };
    const result = getPaginationResponseFrom(dataInfo);

    expect(result).toEqual(expetedValue);
  });

  it('If total element are lower than a multiple of the data length, should return pagination data with total_pages calculated in excess', () => {
    const dataInfo: IFetchResult = {
      currentOffset: 2,
      dataLength: 3,
      totalElements: 8,
    };
    const expetedValue = {
      total_records: 8,
      current_page: 2,
      total_pages: 3,
      next_page: 3,
      prev_page: 1,
    };
    const result = getPaginationResponseFrom(dataInfo);

    expect(result).toEqual(expetedValue);
  });

  it('If the data length is equal to total elements, should return pagination data with next_page and prev_page null', () => {
    const dataInfo: IFetchResult = {
      currentOffset: 1,
      dataLength: 2,
      totalElements: 2,
    };
    const expetedValue = {
      total_records: 2,
      current_page: 1,
      total_pages: 1,
      next_page: null,
      prev_page: null,
    };
    const result = getPaginationResponseFrom(dataInfo);

    expect(result).toEqual(expetedValue);
  });
});
