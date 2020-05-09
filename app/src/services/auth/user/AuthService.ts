export interface AuthService {
    login(email: string, password: string): Promise<any>;
    logout(email: string): Promise<any>;
}