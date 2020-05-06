import {IUser} from "../../entities/User";
import Loki from "lokijs";
import {UserRepository} from "../../repository/user/UserRepository";
import {BaseDataSource} from "../BaseDataSource";
import {FileDbUtils} from "../filedb/FileDbUtils";


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
       return this.userDoc.insert({id: FileDbUtils.getRandomInt(), name: user.name, email: user.email });
    }

    async remove(id: number): Promise<boolean> {
        const user = await this.userDoc.findOne({id});
        return this.userDoc.remove(user);
    }

    getAll(): Promise<IUser[]> {
        return this.userDoc.find({});
    }

    getOne(id: number): Promise<IUser> {
        return this.userDoc.findOne({id});
    }

    update(user: IUser): Promise<IUser> {
        return this.userDoc.update(user);
    }
}