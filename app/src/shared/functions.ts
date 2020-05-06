import logger from './Logger';
import crypto from 'crypto'
import {OkayAuthGuiParams} from "../services/auth/interface/OkayAuthGuiParams";
import {OkayAuthBody} from "../services/auth/interface/OkayAuthBody";
import {FileDbUtils} from "../data/db/filedb/FileDbUtils";

const {TENANT_ID, SECRET} = process.env;

export const pErr = (err: Error) => {
    if (err) {
        logger.error(err);
    }
};

export const getRandomInt = () => {
    return Math.floor(Math.random() * 1_000_000_000_000);
};

export function createHashSignature(hashStr: string) {
    return crypto
        .createHash('sha256')
        .update(hashStr)
        .digest('base64')
}

export function prepareOkayRequestBody(userExternalId: string, type?: number, authParams?: OkayAuthGuiParams): OkayAuthBody {
    const hashStr = authParams ? `${TENANT_ID}${userExternalId}${authParams.guiHeader}${authParams.guiText}${type}${SECRET}`:`${TENANT_ID}${userExternalId}${SECRET}`;
    const signature = createHashSignature(hashStr);

    return (type != null && authParams != null) ? <OkayAuthBody>{
        tenantId: Number(TENANT_ID),
        userExternalId,
        type,
        authParams,
        signature
    } : <OkayAuthBody>{
        tenantId: Number(TENANT_ID),
        userExternalId,
        signature
    }
}

