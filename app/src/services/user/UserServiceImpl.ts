import {UserService} from "./UserService";
import {UserRepositoryImpl} from "../../data/repository/user/UserRepositoryImpl";
import {UserRepository} from "../../data/repository/user/UserRepository";
import {IUser} from "../../data/models/User";

export class UserServiceImpl implements UserService {
    private readonly userRepo: UserRepository = new UserRepositoryImpl();

    findAll(): Promise<IUser[]> {
        return this.userRepo.getAll();
    }

    findUserByEmail(email: string): Promise<IUser> {
        return this.userRepo.getOneByEmail(email);
    }

    findUserById(id: number): Promise<IUser> {
        return this.userRepo.getOneById(id);
    }

    registerUser(user: IUser): Promise<IUser> {
        return this.userRepo.add(user);
    }

    removeUser(id: number): Promise<boolean> {
        return this.userRepo.remove(id);
    }

    updateUser(user: IUser): Promise<IUser> {
        return this.userRepo.update(user);
    }
}