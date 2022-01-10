import {getRandomInt} from '@shared/functions';

export class DbUtils {

    static getRandomInt (): number {
        return getRandomInt();
    }

    static generateUserExternalId() {
        return `${getRandomInt()}-${getRandomInt()}`;
    }
}