import list from "../models/listModel.js";
const createList=async(req,res)=>{
    const {title, description, image,price}=req.body;
    try{
        if(!title || !description || !image || !price){
        return res.status(401).json({message:"all field filled are required"});
    } 
    const newList=await list({
        title,
        description,
        image,
        price,

    })
    await newList.save();
    return res.status(200).json({message:"list created successfull"})

    }catch(err){
        return res.status(500).json({message:"server error"})
    }
    
}
 const getAllList=async(req,res)=>{
    try{
        const allList=await list.find({});
        if(!allList){
            return res.status(404).json({message:"list not found"});
        }
        return res.status(200).json({allList});
        
    }catch(err){
        return res.status(500).json({message:"server error"})
    }
}
const getListById=async(req,res)=>{
    const {listId}=req.params;
    console.log(listId);
    try{
        const listData=await list.findById(listId);
        if(!listData){
            return res.status(404).json({message:"list is not found"});
        }
        return res.status(200).json({success:true,listData});
    }catch(err){
        return res.status(500).json({message:"server error"});
    }

}
const updateListById=async(req,res)=>{
    const {listId}=req.params;
    const {title,description,image}=req.body;
    try{
        const updateList=await list.findByIdAndUpdate(listId);
        if(!updateList){
            return res.status(401).json({message:"list not fount "});
        }
        updateList.title=title;
        updateList.description=description;
        updateList.image=image;
        await updateList.save();
        return res.status(200).json({message:"update successfull"});

    }catch(err){
        return res.status(500).json({message:"sever error"})
    }
}
const deleteListById=async(req,res)=>{
    const {listId}=req.params;
    console.log(listId);
    try{
        const deleteList=await list.findByIdAndDelete(listId);
        if(!deleteList){
            return res.status(404).json({message:"list is not found"})
        }
        return res.status(200).json({message:"list deleted successfull"});

    }catch(err){
        return res.status(500).json({message:"sever error"})

    }
}
const deleteAllList=async(req,res)=>{
    
    try{
        const deleteList=await list.deleteMany({});
        if(!deleteList){
            return res.status(404).json({message:"list is not found"})
        }
        return res.status(200).json({message:"list deleted successfull"});

    }catch(err){
        return res.status(500).json({message:"sever error"})

    }
}
export default {createList,getAllList,getListById,updateListById,deleteListById,deleteAllList}

