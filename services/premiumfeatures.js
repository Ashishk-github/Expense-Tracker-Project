const AWS=require('aws-sdk');
module.exports= async (data,filename)=>{
    try{
        let s3bucket=new AWS.S3({
            accessKeyId:process.env.AWS_ACCESS_KEY,
            secretAccessKey:process.env.AWS_ACCESS_SECRET,
        })
        params={
            Bucket:process.env.BUCKET,
            Key:filename,
            Body:data,
            ACL:'public-read'
        }
        return new Promise((resolve,reject)=>{
            s3bucket.upload(params,(err,s3response)=>{
                if(err) reject(err);
                else resolve(s3response);
            })
        });
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }    
}

