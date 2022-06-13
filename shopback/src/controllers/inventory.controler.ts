import {  NextFunction, Request, Response } from 'express';
import { createInventorySchema } from '../schemas/inventory.schema';
import { createInventory,loadInventory,editInventoryData, deleteInventory } from '../services/inventory.service';

export const saveInventory = async (
    req: Request<{}, {}, createInventorySchema>,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = res.locals.user;
        // Create inventory
        const inventory = await createInventory({ itemName: req.body.itemName, location: req.body.location, userId: user._id });

        // Send Access Token
        res.status(200).json({
            status: 'success',
            inventory,
        });
    } catch (err: any) {
        next(err);
    }
};


export const updateInvetory  = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = res.locals.user;
        // Create inventory
        const inventory = await editInventoryData( req.body.id, { status: req.body.status, location: req.body.location });

        // Send Access Token
        res.status(200).json({
            status: 'success',
            inventory,
        });
    } catch (err: any) {
        next(err);
    }
};



export const getInventory = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = res.locals.user;
        // Create inventory
        const allInventory = await loadInventory();

        // Send Access Token
        res.status(200).json({
            status: 'success',
            allInventory,
        });
    } catch (err: any) {
        next(err);
    }
};



export const markdeleted = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = res.locals.user;
        // Create inventory
        const allInventory = await deleteInventory(<string>req.query.id);

        // Send Access Token
        res.status(200).json({
            status: 'success',
            allInventory,
        });
    } catch (err: any) {
        next(err);
    }
};
