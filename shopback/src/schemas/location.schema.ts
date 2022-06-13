import { object, string, TypeOf } from 'zod';

export const createLocationSchema = object({
  body: object({
    city: string({ required_error: 'city is required' }),
    locationName: string({ required_error: 'locationName is required' }),
  })
});


export type createLocationSchema = TypeOf<typeof createLocationSchema>['body'];
