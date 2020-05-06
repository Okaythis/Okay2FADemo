import express from 'express';
import {Okay2FAService} from "../../services/auth/Okay2FAService";
import {INTERNAL_SERVER_ERROR} from "http-status-codes";

const router = express.Router();
const okay2FAService = new Okay2FAService();

router.post('/:userExternalId', (req, res) => {
    const { userExternalId } = req.params;
    okay2FAService
        .linkUser(userExternalId)
        .then((response) => {
            res.json(response.data);
        })
        .catch((error) => {
            res.status(INTERNAL_SERVER_ERROR).json({
                msg: 'Authorization was not unsuccessful',
                data: error.response.data
            });
        });
});

export default router;
