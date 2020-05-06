import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core';

import UserDao from '../data/repository/mock/User/User.mock';
import {invalidUserIDQueryParameterError, paramMissingError} from '@shared/constants';
import {UserRepositoryImpl} from "../data/repository/user/UserRepositoryImpl";

// Init shared
const router = Router();
// TODO: use a service instead
const userRepo = new UserRepositoryImpl();

router.get('/all', async (req: Request, res: Response) => {
    const users = await userRepo.getAll();
    return res.status(OK).json({users});
});

router.get('/id/:id', async (req: Request, res: Response) => {
    const {id} = req.params;
    if(!id) {
        return res.status(BAD_REQUEST).json({
            error: invalidUserIDQueryParameterError,
        });
    }
    const user = await userRepo.getOne(Number(id));
    return res.status(OK).json({user});
});

router.post('/add', async (req: Request, res: Response) => {
    const { user } = req.body;
    if (!user) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    await userRepo.add(user);
    return res.status(CREATED).end();
});

router.put('/update', async (req: Request, res: Response) => {
    const { user } = req.body;
    if (!user) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    user.id = Number(user.id);
    await userRepo.update(user);
    return res.status(OK).end();
});

router.delete('/delete/:id', async (req: Request, res: Response) => {
    const { id } = req.params as ParamsDictionary;
    await userRepo.remove(Number(id));
    return res.status(OK).end();
});

export default router;
