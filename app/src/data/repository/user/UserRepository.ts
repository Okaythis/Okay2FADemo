import {IUser} from "../../models/User";

export interface UserRepository {
    getOneById: (id: number) => Promise<IUser | null> | undefined;
    getOneByEmail: (email: string) => Promise<IUser | null> | undefined;
    getAll: () => Promise<IUser[]> | undefined;
    add: (user: IUser) => Promise<IUser> | undefined;
    update: (user: IUser) => Promise<IUser> | undefined;
    remove: (id: number) => Promise<boolean> | undefined;
}