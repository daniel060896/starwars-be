import { DataSource } from "typeorm";
import { AppDataSource, ENTITIES } from "../../src/infrastructure/database/data-source";

let testDataSource: DataSource;
let appDataSourceInitialized: boolean = false;

export const initializeTestDataSource = async () => {
  if (!appDataSourceInitialized) await AppDataSource.initialize();
  if (!testDataSource || !testDataSource.isInitialized) {
    testDataSource = new DataSource({
      type: "sqlite",
      database: "test.sqlite3",
      synchronize: true,
      entities: ENTITIES,
    });
    await testDataSource.initialize();
    AppDataSource.setOptions(testDataSource.options);
  }
};

export const destroyTestDataSource = async () => {
  if (testDataSource && testDataSource.isInitialized) {
    await testDataSource.destroy();
  }
};

export const resetDatabase = async () => {
  await Promise.all(
    ENTITIES.map(async entity => {
      const repository = AppDataSource.getRepository(entity);
      await repository.delete({});
    }),
  );
  return;
};
