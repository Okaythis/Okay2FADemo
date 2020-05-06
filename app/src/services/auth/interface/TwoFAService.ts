export interface TwoFAService {
    authorizeWithPin(userExternalId: string): Promise<any>;
    authorizeWithBiometrics(userExternalId: string): Promise<any>
    authorizeWithSimpleButtonClick(userExternalId: string): Promise<any>
}