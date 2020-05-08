import { Router } from 'express';
import UserSessionRouter from './login';
import TwoFARouter from './twofa'


// Init router and path
const router = Router();

// Add sub-routes
router.use('/2fa', TwoFARouter);
router.use('/user', UserSessionRouter);


// Export the base-router
export default router;