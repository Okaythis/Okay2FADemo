import {DataSourceAccessor, SUPPORTED_DATA_SOURCES} from './DataSourceAccessor';
import {DataSource} from '../DataSource';
import {InMemoryDataSource} from '../inmemory/InMemoryDataSource';
import {FileDbDataSource} from '../filedb/FileDbDataSource';

export class DataSourceAccessorImpl implements DataSourceAccessor {
    getDataSource(): DataSource {
        const {DATA_SOURCE_IN_USE} = process.env;
        switch (DATA_SOURCE_IN_USE) {
            case SUPPORTED_DATA_SOURCES.LokiJs:
                return new InMemoryDataSource();
            case SUPPORTED_DATA_SOURCES.FileBasedDB:
                return new FileDbDataSource();
            default:
                return new InMemoryDataSource();
        }
    }
}