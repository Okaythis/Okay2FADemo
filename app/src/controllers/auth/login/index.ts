import express from 'express';
import {INTERNAL_SERVER_ERROR, NOT_FOUND} from "http-status-codes";
import {Okay2FAService} from "../../../services/auth/Okay2FAService";
import {UserRepositoryImpl} from "../../../data/repository/user/UserRepositoryImpl";
import {EMAIL_NOT_PRESENT_ERROR, USER_NOT_FOUND_ERROR} from "@shared/constants";

const router = express.Router();
const okay2FAService = new Okay2FAService();
const userRepo = new UserRepositoryImpl();

router.post('/login', async (req, res) => {
    const {email} = req.body;
    // verify user credentials here.
    // normally you will have to check if this is a valid email
    // and also check the user's password
    // but we skip those to keep things concise

    if(!email) {
        res.json({
            err: EMAIL_NOT_PRESENT_ERROR
        })
        return;
    }
    const user = await userRepo.getOneByEmail(email);
    if(!user) {
        res.status(NOT_FOUND).json({
            err: USER_NOT_FOUND_ERROR
        })
        return;
    }

    // user has been authenticated successfully
    // we can now send 2fa request to the mobile device
    okay2FAService
        .authorizeWithSimpleButtonClick(user.userExternalId)
        .then((response) => {
            res.json({
                msg: "login was successful. Push notification was sent",
                sessionDetails: response.data
            })
        })
        .catch((error) => {
            res.status(INTERNAL_SERVER_ERROR).json({
                msg: 'login was not successful. Push notification was not sent',
                err: error.response.data
            });
        });
});

export default router;