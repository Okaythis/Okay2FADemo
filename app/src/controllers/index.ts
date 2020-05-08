import { Router } from 'express';
import UserRouter from './users';
import AuthRouter from './auth/'
import DynamicLinkRouter from './link/'

// Init router and path
const router = Router();

// Add sub-routes
router.use('/users', UserRouter);
router.use('/auth', AuthRouter)
router.use('/link', DynamicLinkRouter);

// Export the base-router
export default router;
