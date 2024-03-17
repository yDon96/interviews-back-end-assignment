export abstract class MockModel<T> {
  protected abstract entityStub: T;

  constructor(createEntityData: T) {
    this.constructorSpy(createEntityData);
  }

  getEntityStub() {
    return this.entityStub;
  }

  constructorSpy(_createEntityData: T): void {}

  findOne(): { exec: () => T } {
    return {
      exec: (): T => this.entityStub,
    };
  }

  async exec(): Promise<T[]> {
    return [this.entityStub];
  }

  find() {
    return this;
  }

  async getSlice(page, limit): Promise<T[]> {
    return [this.entityStub];
  }

  async countDocuments(): Promise<number> {
    return [this.entityStub].length;
  }

  async save(): Promise<T> {
    return this.entityStub;
  }

  async findOneAndUpdate(): Promise<T> {
    return this.entityStub;
  }
}
