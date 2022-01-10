import logger from './Logger';
import crypto from 'crypto'
import {OkayAuthGuiParams} from '../services/auth/interface/OkayAuthGuiParams';
import {OkayAuthBody, OkayCheckSessionBody} from '../services/auth/interface/OkayAuthBody';

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

    return (type != null && authParams != null) ? {
        tenantId: Number(TENANT_ID),
        userExternalId,
        type,
        authParams,
        signature
    } as OkayAuthBody : {
        tenantId: Number(TENANT_ID),
        userExternalId,
        signature
    } as OkayAuthBody
}

export function prepareOkayCheckSessionRequestBody(sessionExternalId: number): OkayCheckSessionBody {
    const hashStr = `${TENANT_ID}${sessionExternalId}${SECRET}`;
    const signature = createHashSignature(hashStr);

    return {
        tenantId: Number(TENANT_ID),
        sessionExternalId,
        signature
    } as OkayCheckSessionBody
}

