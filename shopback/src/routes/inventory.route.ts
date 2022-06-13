import express from 'express';
import { saveInventory,getInventory,updateInvetory,markdeleted } from '../controllers/inventory.controler';
 
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { restrictTo } from '../middleware/restrictTo';

const router = express.Router();
router.use(deserializeUser, requireUser);

// Admin Get Users route
router.post('/', restrictTo('admin'), saveInventory);
router.put('/', restrictTo('admin'), updateInvetory);
router.delete('/', restrictTo('admin'), markdeleted);

// Get my info route
router.get('/', getInventory);

export default router;

