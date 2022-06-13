import {  NextFunction, Request, Response } from 'express';
import { createLocationSchema } from '../schemas/location.schema';
import { createLocation, deleteLocation, loadLocation } from '../services/location.service';

export const saveLocation = async (
    req: Request<{}, {}, createLocationSchema>,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = res.locals.user;
        // Create inventory
        const location = await createLocation({ locationName: req.body.locationName, city: req.body.city, userId: user._id });

        // Send Access Token
        res.status(200).json({
            status: 'success',
            location,
        });
    } catch (err: any) {
        next(err);
    }
};


 


export const getLocation = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = res.locals.user;
        // get all locations
        const allLocations = await loadLocation();

        // Send Access Token
        res.status(200).json({
            status: 'success',
            allLocations,
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
        // delete location
        await deleteLocation(<string>req.query.id);

        // Send Access Token
        res.status(200).json({
            status: 'success',
        });
    } catch (err: any) {
        next(err);
    }
};
