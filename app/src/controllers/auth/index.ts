import express from 'express';
import {
    invalidExternalUserIDQueryParameterError
} from "@shared/constants";
import {BAD_REQUEST, INTERNAL_SERVER_ERROR} from "http-status-codes";
import {Okay2FAService} from "../../services/auth/Okay2FAService";

const router = express.Router();
const okay2FAService = new Okay2FAService();

router.post('/simple', (req, res) => {
    const userExternalId = req.query.userExternalId as string;
    if (!userExternalId) {
        return res
            .status(BAD_REQUEST)
            .json({
                error: invalidExternalUserIDQueryParameterError
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
                error: invalidExternalUserIDQueryParameterError
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
                error: invalidExternalUserIDQueryParameterError
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
                error: invalidExternalUserIDQueryParameterError
            })
    }

    okay2FAService
        .getAuthSessionStatus(externalSessionId.toString())
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

export default router;