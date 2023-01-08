const express = require('express');
const Posts = require('../models/product.service.models');
const multer = require("multer")
const router = express.Router();


const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, '../../Frontend/Assignment_frontend/client/public/uploads/')
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
})
const upload = multer({storage: storage});

//save posts

router.post('/product/save', upload.single('articleImage'), (req,res)=>{
    const newPost = new Posts({
        sku: req.body.sku,
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        qty: req.body.qty,
        articleImage: req.file.originalname
    });

    newPost.save((err)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"post save successfully"
        });
    });
});

//get posts

router.get('/products',(req,res)=>{
    Posts.find().exec((err,posts)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingPosts:posts
        });
    });
});

//get a specific post

router.get("/product/:id",(req,res) =>{
    let postId = req.params.id;

    Posts.findById(postId,(err,post)=>{
        if(err){
            return res.status(400).json({success:false,err});
        }
        return res.status(200).json({
            success:true,
            post
        });
    });
});

//update posts

router.put('/product/update/:id',upload.single('articleImage'),(req,res) => {
   
    Posts.findById(req.params.id)
        .then((post) =>{
            post.sku = req.body.sku;
            post.name = req.body.name;
            post.price = req.body.price;
            post.description = req.body.description;
            post.qty = req.body.qty;
            post.articleImage = req.file.articleImage;

            post
            .save()
            .then(() => res.json("Post Updated!"))
            .catch((err) => res.status(400).json(`Error: ${err}`));
        })
        .catch((err) => res.status(400).json(`Error: ${err}`));
});

//delete post

router.delete('/product/delete/:id',(req,res)=>{
    Posts.findByIdAndRemove(req.params.id).exec((err,deletedPost)=>{

        if(err)return res.status(400).json({
            message:"Delete unsuccessful",err
        });
        return res.json({
            message:"delete is successful",deletedPost
        });
    });

});



module.exports = router;