import {IUser} from '../../data/models/User';

export interface UserService {
    findAll() : Promise<IUser[]>
    findUserById(id: number): Promise<IUser>
    findUserByEmail(email: string): Promise<IUser>
    registerUser(user: IUser): Promise<IUser>;
    removeUser(id: number): Promise<boolean>;
    updateUser(user: IUser): Promise<IUser>;
}