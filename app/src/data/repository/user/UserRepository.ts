import {IUser} from "../../entities/User";

export interface UserRepository {
    getOne: (id: number) => Promise<IUser | null> | undefined;
    getAll: () => Promise<IUser[]> | undefined;
    add: (user: IUser) => Promise<IUser> | undefined;
    update: (user: IUser) => Promise<IUser> | undefined;
    remove: (id: number) => Promise<boolean> | undefined;
}