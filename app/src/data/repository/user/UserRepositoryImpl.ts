import {UserRepository} from "./UserRepository";
import {IUser} from "../../entities/User";
import {InMemoryDataSource} from "../../db/inmemory/InMemoryDataSource";
import {DataSourceAccessorImpl} from "../../db/accessor/DataSourceAccessorImpl";
import {BaseDataSource} from "../../db/BaseDataSource";

export class UserRepositoryImpl implements UserRepository {

    private dataSource?: BaseDataSource;

    constructor() {
        this.dataSource = new DataSourceAccessorImpl().getDataSource();
    }

    add(user: IUser): Promise<IUser> | undefined {
        return this.dataSource?.add(user);
    }

    remove(id: number): Promise<boolean> | undefined {
        return this.dataSource?.remove(id);
    }

    getAll(): Promise<IUser[]> | undefined {
        return this.dataSource?.getAll();
    }

    getOne(id: number): Promise<IUser | null> | undefined {
        return this.dataSource?.getOne(id);
    }

    update(user: IUser): Promise<IUser> | undefined  {
        return this.dataSource?.update(user)
    }

}