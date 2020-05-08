import {DataSource} from "./DataSource";
import {IUser} from "../models/User";

export abstract class BaseDataSource implements DataSource {
    abstract add(user: IUser): Promise<IUser>;

    abstract getAll(): Promise<IUser[]>;

    abstract getOneById(id: number): Promise<IUser>;

    abstract remove(id: number): Promise<boolean>;

    abstract update(user: IUser): Promise<IUser>;

    abstract getOneByEmail(email: string): Promise<IUser>;
}