import { object, string, TypeOf } from 'zod';

export const createInventorySchema = object({
  body: object({
    itemName: string({ required_error: 'itemName is required' }),
    location: string({ required_error: 'location is required' }),
  })
});


export type createInventorySchema = TypeOf<typeof createInventorySchema>['body'];
