import locationModel, { Location } from "../models/location.model copy";

 
// CreateUser service
export const createLocation = async (input: Partial<Location>) => {
  const inventory = await locationModel.create(input);
  return  inventory;
};

// loadInventory service
export const loadLocation = async () => {
  const inventories = await locationModel.find({
    deleted:false
  });
  return  inventories;
};
 
 


export const deleteLocation =async (  id:string) => {
  const inventories = await locationModel.findByIdAndUpdate( id,{$set:{deleted:true}});
  return  inventories;
}