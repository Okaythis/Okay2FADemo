import express from 'express';
import {
    INVALID_EXTERNAL_USER_ID_QUERY_PARAMETER_ERROR
} from "@shared/constants";
import {BAD_REQUEST, INTERNAL_SERVER_ERROR} from "http-status-codes";
import {Okay2FAService} from "../../../services/auth/2fa/Okay2FAService";

const router = express.Router();
const okay2FAService = new Okay2FAService();

router.post('/simple', (req, res) => {
    const userExternalId = req.query.userExternalId as string;
    if (!userExternalId) {
        return res
            .status(BAD_REQUEST)
            .json({
                error: INVALID_EXTERNAL_USER_ID_QUERY_PARAMETER_ERROR
            })
    }
    okay2FAService
        .authorizeWithSimpleButtonClick(userExternalId)
        .then((response) => {
            res.json(response.data);
        })
        .catch((error) => {
            res.status(INTERNAL_SERVER_ERROR).json({
                msg: 'Authorization was not unsuccessful',
                data: error.response.data
            });
        });
})

router.post('/pin', (req, res) => {
    const userExternalId = req.query.userExternalId as string;
    if (!userExternalId) {
        return res
            .status(BAD_REQUEST)
            .json({
                error: INVALID_EXTERNAL_USER_ID_QUERY_PARAMETER_ERROR
            })
    }
    okay2FAService
        .authorizeWithPin(userExternalId)
        .then((response) => {
            res.json(response.data);
        })
        .catch((error) => {
            res.status(INTERNAL_SERVER_ERROR).json({
                msg: 'Authorization was not unsuccessful',
                data: error.response.data
            });
        });

})

router.post('/biometric', (req, res) => {
    const userExternalId = req.query.userExternalId as string;
    if (!userExternalId) {
        return res
            .status(BAD_REQUEST)
            .json({
                error: INVALID_EXTERNAL_USER_ID_QUERY_PARAMETER_ERROR
            })
    }

    okay2FAService
        .authorizeWithBiometrics(userExternalId)
        .then((response) => {
            res.json(response.data);
        })
        .catch((error) => {
            res.status(INTERNAL_SERVER_ERROR).json({
                msg: 'Authorization was not unsuccessful',
                data: error.response.data
            });
        });

})

router.get('/status/:externalSessionId', (req, res) => {
    const {externalSessionId} = req.params;
    if (!externalSessionId) {
        return res
            .status(BAD_REQUEST)
            .json({
                error: INVALID_EXTERNAL_USER_ID_QUERY_PARAMETER_ERROR
            })
    }

    okay2FAService
        .getAuthSessionStatus(Number(externalSessionId))
        .then((response) => {
            res.json(response.data);
        })
        .catch((error) => {
            res.status(INTERNAL_SERVER_ERROR).json({
                msg: `Failed to get status update for session with id: ${externalSessionId}`,
                data: error.response.data
            });
        });

})

export default router;