import jsonfile from "jsonfile";
import {getRandomInt} from "@shared/functions";

export class FileDbUtils {
    static saveDb(dbFilePath: string, db: any, ): Promise<any> {
        return jsonfile.writeFile(dbFilePath, db);
    }
}