import {AuthService} from "./AuthService";
import {EMAIL_NOT_PRESENT_ERROR, USER_NOT_FOUND_ERROR} from "@shared/constants";
import {UserRepository} from "../../../data/repository/user/UserRepository";
import {UserRepositoryImpl} from "../../../data/repository/user/UserRepositoryImpl";
import {Okay2FAService} from "../2fa/Okay2FAService";

export class AuthServiceImpl implements AuthService {

    private readonly userRepo: UserRepository = new UserRepositoryImpl()
    private readonly okay2FAService: Okay2FAService = new Okay2FAService()

    async login(email: string, password: string): Promise<any> {
        if (!email) {
            return Promise.reject(EMAIL_NOT_PRESENT_ERROR);
        }
        const user = await this.userRepo.getOneByEmail(email);
        if (!user) {
            return Promise.reject(USER_NOT_FOUND_ERROR);
        }
        // user has been authenticated successfully
        // we can now send 2fa request to the mobile device
        return this.okay2FAService
            .authorizeWithSimpleButtonClick(user.userExternalId)
    }

    logout(email: string): Promise<any> {
        return Promise.resolve(undefined);
    }
}