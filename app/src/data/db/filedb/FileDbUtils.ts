import jsonfile from 'jsonfile';

export class FileDbUtils {
    static saveDb(dbFilePath: string, db: any, ): Promise<any> {
        return jsonfile.writeFile(dbFilePath, db);
    }
}