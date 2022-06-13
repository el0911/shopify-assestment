import {
    getModelForClass,
    index,
    modelOptions,
    pre,
    prop,
} from '@typegoose/typegoose';
 
@modelOptions({
    schemaOptions: {
        // Add createdAt and updatedAt fields
        timestamps: true,
    },
})

// Export the User class to be used as TypeScript type
export class Location {
    @prop()
    locationName: string = '';

    @prop()
    city: string = '';

    @prop()
    userId: string = '';

    @prop( {default: false })
    deleted: boolean = false;

    @prop()
    createdAt: string = '';  

    @prop()
    updatedAt: string = '';  

   
}

// Create the user model from the User class
const locationModel = getModelForClass(Location);
export default locationModel;
