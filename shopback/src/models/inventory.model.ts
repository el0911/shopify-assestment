import {
    getModelForClass,
    index,
    modelOptions,
    pre,
    prop,
} from '@typegoose/typegoose';

@pre<Inventory>('save', async function () {
     //create order id
     //set status
     //set userId
     this.status = 'IN_TRANSIT';
     this.orderId = (new Date().getTime()).toString(36) + new Date().getUTCMilliseconds()

})

@modelOptions({
    schemaOptions: {
        // Add createdAt and updatedAt fields
        timestamps: true,
    },
})

// Export the User class to be used as TypeScript type
export class Inventory {
    @prop()
    orderId: string = '';

    @prop()
    userId: string = '';

    @prop( {default: false })
    deleted: boolean = false;

    @prop()
    location: string = '';
      
    @prop()
    itemName: string = '';

    @prop()
    status!: string;

    @prop()
    createdAt: string = '';  

    @prop()
    updatedAt: string = '';  

   
}

// Create the user model from the User class
const inventoryModel = getModelForClass(Inventory);
export default inventoryModel;
