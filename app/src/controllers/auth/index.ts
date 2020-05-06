import express from 'express';
import {
    AUTH_TYPES
} from "@shared/constants";
import {
    createHashSignature
} from "@shared/functions";
import axios from 'axios'

const router = express.Router();
const { PSS_BASE_URL, TENANT_ID, SECRET } = process.env;

router.post('/', (req, res) => {
    // const userExternalId = STORE.users[0].uuid;
    const userExternalId = req.query.userExternalId || null;
    const authParams = {
        guiText: 'Do you okay this transaction',
        guiHeader: 'Authorization requested'
    };
    const type = AUTH_TYPES.OK
    const hashStr = `${TENANT_ID}${userExternalId}${authParams.guiHeader}${authParams.guiText}${type}${SECRET}`;
    const signature = createHashSignature(hashStr);
    console.log(signature);

    axios({
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        url: `${PSS_BASE_URL}/gateway/auth`,
        data: {
            tenantId: TENANT_ID,
            userExternalId,
            type,
            authParams,
            signature
        }
    })
        .then((response) => {
            res.json(response.data);
        })
        .catch((error) => {
            res.status(500).json({
                msg: 'Authentication unsuccessful',
                data: error.response.data
            });
        });

})

router.post('/pin', (req, res) => {
    const userExternalId = req.query.userExternalId || null;
    const authParams = {
        guiText: 'Do you okay this transaction',
        guiHeader: 'Authorization requested'
    };
    const type = AUTH_TYPES.PIN
    const hashStr = `${TENANT_ID}${userExternalId}${authParams.guiHeader}${authParams.guiText}${type}${SECRET}`;
    const signature = createHashSignature(hashStr);
    console.log(signature);

    axios({
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        url: `${PSS_BASE_URL}/gateway/auth`,
        data: {
            tenantId: TENANT_ID,
            userExternalId,
            type,
            authParams,
            signature
        }
    })
        .then((response) => {
            res.json(response.data);
        })
        .catch((error) => {
            res.status(500).json({
                msg: 'Authentication unsuccessful',
                data: error.response.data
            });
        });

})

router.post('/biometric', (req, res) => {
    const userExternalId = req.query.userExternalId || null;
    const authParams = {
        guiText: 'Do you okay this transaction',
        guiHeader: 'Authorization requested'
    };
    const type = AUTH_TYPES.BIOMETRIC_OK
    const hashStr = `${TENANT_ID}${userExternalId}${authParams.guiHeader}${authParams.guiText}${type}${SECRET}`;
    const signature = createHashSignature(hashStr);
    console.log(signature);

    axios({
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        url: `${PSS_BASE_URL}/gateway/auth`,
        data: {
            tenantId: TENANT_ID,
            userExternalId,
            type,
            authParams,
            signature
        }
    })
        .then((response) => {
            res.json(response.data);
        })
        .catch((error) => {
            res.status(500).json({
                msg: 'Authentication unsuccessful',
                data: error.response.data
            });
        });

})

export default router