import {DataSourceAccessor, SUPPORTED_DATA_SOURCES} from "./DataSourceAccessor";
import {DataSource} from "../DataSource";
import {InMemoryDataSource} from "../inmemory/InMemoryDataSource";

export class DataSourceAccessorImpl implements DataSourceAccessor {
    getDataSource(): DataSource {
        let {DATA_SOURCE_IN_USE} = process.env;
        switch (DATA_SOURCE_IN_USE) {
            case SUPPORTED_DATA_SOURCES.LokiJs:
                return new InMemoryDataSource();
            case SUPPORTED_DATA_SOURCES.FileBasedDB:
                return new InMemoryDataSource();
            default:
                return new InMemoryDataSource();
        }
    }
}