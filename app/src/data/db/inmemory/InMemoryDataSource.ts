import {IUser} from "../../models/User";
import Loki from "lokijs";
import {BaseDataSource} from "../BaseDataSource";
import {DbUtils} from "@shared/utils/DbUtils";


export class InMemoryDataSource extends BaseDataSource{

    private db?: any;
    private userDoc?: any;

    constructor() {
        super();
        let {DB_NAME: dbInUse} = process.env;
        if (!dbInUse) throw new Error("Invalid DB name");
        this.db = new Loki(dbInUse);
        this.userDoc = this.db.addCollection('users')
    }

    add(user: IUser): Promise<IUser> {
        const {name, email } = user
        const userExternalId = DbUtils.generateUserExternalId();
       return this.userDoc.insert({id: DbUtils.getRandomInt(), name, email, userExternalId});
    }

    async remove(id: number): Promise<boolean> {
        const user = await this.userDoc.findOne({id});
        return this.userDoc.remove(user);
    }

    getAll(): Promise<IUser[]> {
        return this.userDoc.find({});
    }

    getOneById(id: number): Promise<IUser> {
        return this.userDoc.findOne({id});
    }

    getOneByEmail(email: string): Promise<IUser> {
        return this.userDoc.findOne({email});
    }

    update(user: IUser): Promise<IUser> {
        return this.userDoc.update(user);
    }
}