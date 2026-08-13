import { Url } from "../models/url.models.js"
import generateShortCode from "../utils/generateShortCode.js"
import validator from 'validator'


const createShortUrl = async (req , res) => {
    try{
        const {url} = req.body

        if (!url || !validator.isURL(url)) {
            return res.status(400).json({ message: 'valid url is required' });
        }

        const existingUrl = await Url.findOne({url})

        if(existingUrl){
            return res.status(200).json({
                message: "short url has already been created for this url",
                existingUrl
            })
        }

        const shortCode = generateShortCode()

        const newUrl = await Url.create({
            url: url,
            shortCode: shortCode,
            accessCount: 0,
            userId: req.user?.id
        })

        return res.status(201).json({
            newUrl,
            message: "new entry is created successfully"
        })
    }catch(err){
        res.status(500).json({ message: 'Something went wrong', error: err.message });
    }
}


const getOriginalUrl = async(req , res) => {
    
    try{
        const {shortCode} = req.params

        if(!shortCode){
            return res.status(400).json({
                message: 'short code is required'
            })
        }

        const doc = await Url.findOne({
            shortCode: shortCode
        })

        if(!doc){
            return res.status(404).json({
                message: 'short code not found'
            })
        }

        return res.status(200).json({
            doc,
            message: 'original doc fetched successfully'
        })


    }catch(err){
        return res.status(500).json({
            message: 'Something went wrong',
            error: err.message
        })
    }
}


const updateShortUrl = async(req , res) => {


    try{
        const {shortCode} = req.params
        const {url} = req.body

        if(!url || !validator.isURL(url)){
            return res.status(400).json({
                message: 'url is required'
            })
        }

        const existingDoc = await Url.findOne({shortCode})

        if (!existingDoc) {
            return res.status(404).json({ message: 'short code not found' })
        }

        //ownership check

        if(existingDoc.userId && existingDoc.userId.toString() !== req.user.id){
            return res.status(403).json({
                message: 'you are not authorized to modify'
            })
        }

        existingDoc.url = url
        await existingDoc.save()

        return res.status(200).json({
            existingDoc,
            message: 'entry updated successfully'
        })

    }catch(err){
        return res.status(500).json({
            message: 'Something went wrong',
            error: err.message
        })
    }
}


const deleteShortUrl = async(req , res) => {
    
    try{
    
        const {shortCode} = req.params

        if(!shortCode){
            return res.status(400).json({
                message: 'short code is required'
            })
        }

        const doc = await Url.findOne({
            shortCode
        })

        if (!doc) {
            return res.status(404).json({ message: 'short code not found' })
        }

        if(doc.userId && doc.userId.toString() !== req.user.id){
            return res.status(403).json({
                message: 'you are not authorized to delete any data'
            })
        }

        await doc.deleteOne()

        return res.status(204).send()

    }catch(err){
        return res.status(500).json({
            message: 'Something went wrong',
            error: err.message
        })
    }
}


const getUrlStats = async(req , res) => {

    try{
        const {shortCode} = req.params

        if(!shortCode){
            return res.status(400).json({
                message: 'short code is required'
            })
        }

        const doc = await Url.findOne({
            shortCode
        })

        if(!doc){
            return res.status(404).json({
                message: 'short code not found in database'
            })
        }

        if(doc.userId && doc.userId.toString() !== req.user.id){
            return res.status(403).json({
                message: 'you are not authorized to check stats'
            })
        }

        return res.status(200).json({
            doc,
            message: 'data fetched successfully'
        })


    }catch(err){
        return res.status(500).json({
            message: 'Something went wrong',
            error: err.message
        })
    }
}



const getRedirect = async(req , res) => {

    try{
        const {shortCode} = req.params

        if(!shortCode){
            return res.status(400).json({
                message: 'short code is required'
            })
        }

        const doc = await Url.findOneAndUpdate(
            {shortCode},

            { $inc : {accessCount: 1}},

            {new: true}
        )

        if(!doc){
            return res.status(404).json({
                message: 'short code not found in database'
            })
        }

        res.redirect(doc.url)


    }catch(err){
        return res.status(500).json({
            message: 'Something went wrong',
            error: err.message
        })
    }
}



const getMyUrls = async(req , res) => {

    try {

        const data = await Url.find({
            userId: req.user?.id
        })

        return res.status(200).json({
            urls: data,
            message: 'urls fetched successfully'
        })
        
    } catch (err) {
        return res.status(500).json({ message: 'Something went wrong', error: err.message })
    }
}


export { createShortUrl, getOriginalUrl, updateShortUrl, deleteShortUrl, getUrlStats , getRedirect , getMyUrls}