import {DataSource} from '../DataSource';

export interface DataSourceAccessor {
    getDataSource: () => DataSource;
}

export const SUPPORTED_DATA_SOURCES =  {
    'LokiJs': 'lokijs',
    'FileBasedDB': 'filebasedb'
}