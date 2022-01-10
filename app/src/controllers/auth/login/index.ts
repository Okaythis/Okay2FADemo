import express from 'express';
import {INTERNAL_SERVER_ERROR} from 'http-status-codes';
import {AuthServiceImpl} from '../../../services/auth/user/AuthServiceImpl';
import {AuthService} from '../../../services/auth/user/AuthService';

const router = express.Router();
const authService: AuthService = new AuthServiceImpl();

router.post('/login', async (req, res) => {
    const {email} = req.body;
    // verify user credentials here.
    // normally you will have to check if this is a valid email
    // and also check the user's password
    // but we skip those to keep things concise

    authService
        .login(email, '')
        .then((response) => {
            res.json({
                msg: 'login was successful. Push notification was sent',
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