import {IUser} from "../models/User";

export interface DataSource {
    // TODO: use generics here
    getOne: (id: number) => Promise<IUser>;
    getAll: () => Promise<IUser[]>;
    add: (user: IUser) => Promise<IUser>;
    update: (user: IUser) => Promise<IUser>;
    remove: (id: number) => Promise<boolean>;
}