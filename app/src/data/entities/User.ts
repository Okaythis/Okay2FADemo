export interface IUser {
    id: number;
    name: string;
    email: string;
    userExternalId: string;
}

class User implements IUser {

    public id: number;
    public name: string;
    public email: string;
    public userExternalId: string;

    constructor(nameOrUser: string | IUser, email?: string, id?: number, userExternalId?: string) {
        if (typeof nameOrUser === 'string') {
            this.userExternalId = userExternalId || ''
            this.name = nameOrUser;
            this.email = email || '';
            this.id = id || -1;
        } else {
            this.userExternalId = nameOrUser.userExternalId;
            this.name = nameOrUser.name;
            this.email = nameOrUser.email;
            this.id = nameOrUser.id;
        }
    }
}

export default User;
