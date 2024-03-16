import { getPaginationParams } from '../../../src/common/decorators/paginationParams';
import { BadRequestException } from '@nestjs/common';

describe('PaginationParams', () => {
  it('should return pagination params', () => {
    const page = 1;
    const size = 10;

    const pagination = getPaginationParams(page, size);

    expect(pagination).toEqual({
      page: 1,
      limit: 10,
      size: 10,
      offset: 10,
    });
  });

  it('should throw BadRequestException if page is invalid', () => {
    const page = parseInt('ssssss');
    const size = 10;

    expect(() => getPaginationParams(page, size)).toThrowError(
      BadRequestException,
    );

    const page1 = -21;
    expect(() => getPaginationParams(page1, size)).toThrowError(
      BadRequestException,
    );
  });

  it('should throw BadRequestException if size is invalid', () => {
    const page = 1;
    const size = parseInt('ssssss');

    expect(() => getPaginationParams(page, size)).toThrowError(
      BadRequestException,
    );

    const size1 = -3;

    expect(() => getPaginationParams(page, size1)).toThrowError(
      BadRequestException,
    );
  });

  it('should throw BadRequestException if size is greater than 100', () => {
    const page = 1;
    const size = 101;

    expect(() => getPaginationParams(page, size)).toThrowError(
      BadRequestException,
    );
  });
});
