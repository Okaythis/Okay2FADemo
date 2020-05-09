import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core';
import {INVALID_USER_ID_QUERY_PARAMETER_ERROR, PARAM_MISSING_ERROR} from '@shared/constants';
import {UserServiceImpl} from "../../services/user/UserServiceImpl";

// Init shared
const router = Router();
const userService = new UserServiceImpl();


router.get('/all', async (req: Request, res: Response) => {
    const users = await userService.findAll();
    return res.status(OK).json({users});
});

router.get('/id/:id', async (req: Request, res: Response) => {
    const {id} = req.params;
    if(!id) {
        return res.status(BAD_REQUEST).json({
            error: INVALID_USER_ID_QUERY_PARAMETER_ERROR,
        });
    }
    const user = await userService.findUserById(Number(id));
    return res.status(OK).json({user});
});

router.post('/register', async (req: Request, res: Response) => {
    const { user } = req.body;
    if (!user) {
        return res.status(BAD_REQUEST).json({
            error: PARAM_MISSING_ERROR,
        });
    }
    await userService.registerUser(user);
    return res.status(CREATED).end();
});

router.put('/update', async (req: Request, res: Response) => {
    const { user } = req.body;
    if (!user) {
        return res.status(BAD_REQUEST).json({
            error: PARAM_MISSING_ERROR,
        });
    }
    user.id = Number(user.id);
    await userService.updateUser(user);
    return res.status(OK).end();
});

router.delete('/delete/:id', async (req: Request, res: Response) => {
    const { id } = req.params as ParamsDictionary;
    await userService.removeUser(Number(id));
    return res.status(OK).end();
});

export default router;
