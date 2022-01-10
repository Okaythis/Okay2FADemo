import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import logger from '@shared/Logger';


// Init shared
const router = Router();

router.get('/', async (req: Request, res: Response) => {
    logger.error('Do not be alarmed. I crashed on purpose (^_^)', Error('Do not be alarmed. I crashed on purpose (^_^)'));
    process.exit(1)
});

export default router;