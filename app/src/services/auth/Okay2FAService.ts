import {TwoFAService} from "./interface/TwoFAService";
import {AUTH_TYPES, OKAY_GUI_HEADER, OKAY_GUI_TEXT} from "@shared/constants";
import {API} from "@shared/API";
import {prepareOkayRequestBody} from "@shared/functions";

const { PSS_BASE_URL } = process.env;
const authParams = {
    guiText: OKAY_GUI_TEXT,
    guiHeader: OKAY_GUI_HEADER
};

export class Okay2FAService implements TwoFAService {
    authorizeWithBiometrics(userExternalId: string): Promise<any> {
        return API
            .post(`${PSS_BASE_URL}/gateway/auth`, prepareOkayRequestBody(userExternalId.toString(), AUTH_TYPES.BIOMETRIC_OK, authParams),
            )
    }

    authorizeWithPin(userExternalId: string): Promise<any> {
        return API
            .post(`${PSS_BASE_URL}/gateway/auth`, prepareOkayRequestBody(userExternalId.toString(), AUTH_TYPES.PIN, authParams),
            );
    }

    linkUser(userExternalId: string): Promise<any> {
        return API
            .post(`${PSS_BASE_URL}/gateway/link`, prepareOkayRequestBody(userExternalId.toString()),
            )
    }

    authorizeWithSimpleButtonClick(userExternalId: string): Promise<any> {
        return API
            .post(`${PSS_BASE_URL}/gateway/auth`, prepareOkayRequestBody(userExternalId.toString(), AUTH_TYPES.OK, authParams),
            )
    }

    getAuthSessionStatus(externalSessionId: string) {
        return API
            .post(`${PSS_BASE_URL}/gateway/check`, prepareOkayRequestBody(externalSessionId),
            )
    }
}