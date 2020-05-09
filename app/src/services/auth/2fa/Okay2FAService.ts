import {TwoFAService} from "../interface/TwoFAService";
import {OKAY_2FA_GUI_HEADER, OKAY_2FA_GUI_TEXT} from "@shared/constants";
import {API} from "@shared/API";
import {prepareOkayCheckSessionRequestBody, prepareOkayRequestBody} from "@shared/functions";
import {OkayAuthTypes} from "./OkayAuthTypes";

const { PSS_BASE_URL } = process.env;
const authParams = {
    guiText: OKAY_2FA_GUI_TEXT,
    guiHeader: OKAY_2FA_GUI_HEADER
};

export class Okay2FAService implements TwoFAService {
    authorizeWithBiometrics(userExternalId: string): Promise<any> {
        return API
            .post(`${PSS_BASE_URL}/gateway/auth`, prepareOkayRequestBody(userExternalId.toString(), OkayAuthTypes.BIOMETRIC_OK, authParams),
            )
    }

    authorizeWithPin(userExternalId: string): Promise<any> {
        return API
            .post(`${PSS_BASE_URL}/gateway/auth`, prepareOkayRequestBody(userExternalId.toString(), OkayAuthTypes.PIN, authParams),
            );
    }

    linkUser(userExternalId: string): Promise<any> {
        return API
            .post(`${PSS_BASE_URL}/gateway/link`, prepareOkayRequestBody(userExternalId.toString()),
            )
    }

    authorizeWithSimpleButtonClick(userExternalId: string): Promise<any> {
        return API
            .post(`${PSS_BASE_URL}/gateway/auth`, prepareOkayRequestBody(userExternalId.toString(), OkayAuthTypes.OK, authParams),
            )
    }

    getAuthSessionStatus(externalSessionId: number) {
        return API
            .post(`${PSS_BASE_URL}/gateway/check`, prepareOkayCheckSessionRequestBody(externalSessionId),
            )
    }
}