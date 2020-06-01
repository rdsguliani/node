const { validationResult } = require('express-validator');

const Post = require('../models/post');

const NUMBER_OF_ITEMS  = 2;

exports.getPosts = (req, res, next) => {

    const currentPage = +req.query.page || 1;
    let totalItems = 0;

    Post.countDocuments()
    .then (items => {
        totalItems = items;
        return Post.find()
                    .skip( (currentPage-1) * NUMBER_OF_ITEMS)
                    .limit(NUMBER_OF_ITEMS)

    })
    .then(posts => {
        console.log(posts)
        res.status(200).json({
            posts: posts,
            totalItems: totalItems
        });
    })
    .catch (err =>  {
        console.log (err);
    })
}

exports.createPosts = (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;
    
    const errors = validationResult(req);
    
    if(!errors.isEmpty()) {
        const error = new Error('entered data is not correct');
        error.statusCode = 422;
        throw error
    }

    const imageUrl = '/' + req.file.path;
    const post = new Post({
            title: title,
            content: content,
            creator: {
                name: 'raman'
            },
            imageUrl: imageUrl,
        })

    return post.save()
        .then(data => {
            // console.log(data)
            return res.status(201).json({
                status: 'created successfully',
                post: data
             })
         })
         .catch( err => {
             if(!err.statusCode) {
                 err.statusCode = 500;
             }
            next(err);
        })

}

exports.getPostById = (req, res, next) => {
    console.log(req.params.postId);
    const postId = req.params.postId
    Post.findById(postId)
        .then (post => {

            if(!post) {
               const error = new Error('Post not found !');
               error.statusCode = 404;
               throw error;
            }

            return res.status(200).json({
                message: 'Post Fetched',
                post: post
            })
        }).catch (err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
           next(err);
        })

}


exports.updateFeed = (req, res, next) => {

    const postId = req.params.postId;
    const title = req.body.title;
    const content = req.body.content;
    const imageUrl = req.body.image
    // const errors = validationResult(req);

    if(req.file) {
        imageUrl = '/' + req.file.path;
    }
    // const p = {
    //     title: title,
    //     content: content,
    //     creator: {
    //         name: 'raman'
    //     }
    // }
    Post.findById(postId)
    .then ( post => {
        console.log(post);
        post.title = title;
        post.content = content;
        post.imageUrl = imageUrl;
        return post.save();

    }).then( (result) => {
        res.status(200).json({
            message: 'updated Successfully',
            posts: result
        })
    }).catch(err => {
        console.log(err);
    })
}

exports.deletePost = (req, res, next) => {
    const postId = req.params.postId;

    Post.findByIdAndDelete(postId)
        .then (result => {
            console.log(result);
            return res.status(200).json({
                message: 'post deleted !!',
                post: result
            })
        })
        .catch( err => {
            console.log(err)
        })

}