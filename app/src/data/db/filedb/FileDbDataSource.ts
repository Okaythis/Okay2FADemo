import {BaseDataSource} from "../BaseDataSource";
import {IUser} from "../../entities/User";
import jsonfile from "jsonfile";
import {FileDbUtils} from "./FileDbUtils";
import  Logger from "@shared/Logger";

export class FileDbDataSource extends BaseDataSource {

    private readonly dbFilePath = 'src/data/db/filedb/MockDb.json';
    private db: any;

    constructor() {
        super();
        this.connectDB().catch(reason => Logger.error(reason));
    }

    async connectDB() {
        this.db = await jsonfile.readFile(this.dbFilePath);
        this.checkDatabase();
    }

    checkDatabase() {
        if (!this.db) {
            throw new Error("FileDb could not be initialized");
        }
    }

    async add(user: IUser): Promise<IUser> {
        try {
            this.checkDatabase();
            user.id = FileDbUtils.getRandomInt();
            this.db.users.push(user);
            await FileDbUtils.saveDb(this.dbFilePath, this.db);
            return Promise.resolve(user);
        } catch (e) {
            throw e;
        }

    }

    getAll(): Promise<IUser[]> {
        try {
            this.checkDatabase();
            return Promise.resolve(this.db.users);
        } catch (e) {
            throw e;
        }

    }

    getOne(id: number): Promise<IUser> {
        try {
            this.checkDatabase();
            let user = this.db.users.find((user: IUser) => user.id === id );
            if (!user) {
                return Promise.reject("User Does not exist");
            }
            return Promise.resolve(user);
        } catch (e) {
            throw e;
        }

    }

    async remove(id: number): Promise<boolean> {
        // let user = this.db.users.reduce((_: any,  user: IUser, index: number) => { user.id === id; this.db.users.splice(index, 1); });
        // let deletedUser = this.db.users.pop(user);
        try {
            this.checkDatabase();
            for (let i = 0; i < this.db.users.length; i++) {
                if (this.db.users[i].id === id) {
                    this.db.users.splice(i, 1);
                    await FileDbUtils.saveDb(this.dbFilePath, this.db);
                    return Promise.resolve(true);
                }
            }
            return Promise.reject("User does not exist");
        } catch (e) {
            throw e;
        }

    }

    async update(user: IUser): Promise<IUser> {
        try {
            this.checkDatabase();
            for (let i = 0; i < this.db.users.length; i++) {
                if (this.db.users[i].id === user.id) {
                    this.db.users[i] = user;
                    await FileDbUtils.saveDb(this.dbFilePath, this.db);
                    return Promise.resolve(this.db.users[i]);
                }
            }
            return Promise.reject("User does not exist");
        } catch (e) {
            throw e;
        }
    }

}