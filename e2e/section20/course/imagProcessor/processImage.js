const Jimp = require('jimp');
const fs = require('fs');
const path = require('path');

exports.processImage = (imageUrl, originalName) => {

    try {
        const fullImagePath = path.join( __dirname, '..', imageUrl);

        const outputPath = path.join( __dirname,'..', '/images/output/' , ('_brightness_'+originalName) );
        console.log(outputPath)
        
        fs.readFile(fullImagePath, (err, buffer) => {
            
        })
        throw new Error('errrrrrrrrr')
    
        Jimp.read(fullImagePath)
        .then ((buffer) => {
            console.log(buffer)
            return buffer
            .resize(256, 256)
            .quality(60)
            .greyscale()
            .write(outputPath)
        })
    }catch (e) {
        console.log(e)
    }
}