import {OkayAuthGuiParams} from './OkayAuthGuiParams';

export interface OkayAuthBody {
    tenantId: number;
    userExternalId: string;
    type?: number;
    authParams?: OkayAuthGuiParams
    signature: string;
}

export interface OkayCheckSessionBody {
    tenantId: number;
    sessionExternalId: number;
    signature: string;
}