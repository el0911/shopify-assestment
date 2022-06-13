import inventoryModel, { Inventory } from '../models/inventory.model';

// CreateUser service
export const createInventory = async (input: Partial<Inventory>) => {
  const inventory = await inventoryModel.create(input);
  return  inventory;
};

// loadInventory service
export const loadInventory = async () => {
  const inventories = await inventoryModel.find({
    deleted:false
  });
  return  inventories;
};
 

export const editInventoryData =async ( id:string, data : any) => {
  console.dir(data)
  const inventories = await inventoryModel.findByIdAndUpdate( id,{$set:data});
  return  inventories;
}



export const deleteInventory =async (  id:string) => {
  const inventories = await inventoryModel.findByIdAndUpdate( id,{$set:{deleted:true}});
  return  inventories;
}