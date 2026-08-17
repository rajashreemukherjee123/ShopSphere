const wishList = require("../model/wishList.schema");


// --------------------------- Add to Wish-List ---------------------------------
const addToWishList = async(req,res)=>{
    try{

        let userId = req.user.user_id;
        let productId = req.body.productId;

        let wishListObj = await wishList.findOne({ userId: userId })
        if(! wishListObj){
            wishListObj = await wishList.create({
                userId : userId,
                items: [{
                    productId : productId
                }]
            })

            return res.status(200).json({message : "Product added to wishlist",wishList: wishListObj});
        }
        const alradyExist =  wishListObj.items.some((item)=>{
            return item.productId.toString() === productId
        })
        if(alradyExist){
            return res.status(400).json({message: "This product is alrady exist in WishList"})
        }else{
            wishListObj.items.push({
                productId: productId
            })

            await wishListObj.save();
            res.status(200).json({message : "Product added to wishlist",wishList: wishListObj})
        }

    }catch(err){
        res.status(500).json({message: err.message});
    }
}


// --------------------------- Show Wish-List ---------------------------------
const getWishList = async(req,res)=>{
    try{
        let wishListObj = await wishList.findOne({ 
            userId: req.user.user_id 
        }).populate("items.productId")
        if(wishListObj){
            res.status(200).json({wishListObj});
        }else{
            res.status(200).json({wishListObj: null});
        }
    }catch(err){
        res.status(500).json({message: err.message});
    }
}


// --------------------------- Remove product from Wish-List ---------------------------------
const removeWishList = async(req,res)=>{
    try{
        let wishListObj = await wishList.findOneAndUpdate({ userId: req.user.user_id},
            {$pull:{
                items: {
                    productId: req.params.pid
                }
                    }},
                    {new:true}
        )
        if(wishListObj){
            res.status(200).json({message: "Product Deleted successfully from Wish-List"});
        }else{
            res.status(404).json({
                message: "Wishlist not found"
            });
        }
    }catch(err){
        res.status(500).json({message: err.message});
    }
}


module.exports = {addToWishList, getWishList, removeWishList};