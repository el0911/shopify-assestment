import express from 'express';
import { saveLocation,getLocation,markdeleted } from '../controllers/location.controler';
 
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { restrictTo } from '../middleware/restrictTo';

const router = express.Router();
router.use(deserializeUser, requireUser);

// Admin Get Users route
router.post('/', restrictTo('admin'), saveLocation);
// router.put('/', restrictTo('admin'), updateInvetory);
router.delete('/', restrictTo('admin'), markdeleted);

// Get my info route
router.get('/', getLocation);

export default router;

