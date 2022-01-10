import {BaseDataSource} from '../BaseDataSource';
import {IUser} from '../../models/User';
import jsonfile from 'jsonfile';
import {FileDbUtils} from './FileDbUtils';
import  Logger from '@shared/Logger';
import {DbUtils} from '@shared/utils/DbUtils';

export class FileDbDataSource extends BaseDataSource {

    private readonly dbFilePath =  `${__dirname}/MockDb.json`;
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
            throw new Error('FileDb could not be initialized');
        }
    }

    async add(user: IUser): Promise<IUser> {
        try {
            this.checkDatabase();
            user.id = DbUtils.getRandomInt();
            user.userExternalId = DbUtils.generateUserExternalId();
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

    getOneById(id: number): Promise<IUser> {
        try {
            this.checkDatabase();
            const result = this.db.users.find((user: IUser) => user.id === id );
            if (!result) {
                return Promise.reject('User Does not exist');
            }
            return Promise.resolve(result);
        } catch (e) {
            throw e;
        }
    }

    getOneByEmail(email: string): Promise<IUser> {
        try {
            this.checkDatabase();
            const result = this.db.users.find((user: IUser) => user.email === email);
            if (!result) {
                return Promise.reject('User Does not exist');
            }
            return Promise.resolve(result);
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
            return Promise.reject('User does not exist');
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
            return Promise.reject('User does not exist');
        } catch (e) {
            throw e;
        }
    }

}