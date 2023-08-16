const decryptCrypto = require ('crypto-js');



const readToken = async(token) => {
    const bytes = decryptCrypto.AES.decrypt(token,'ASC');
    const decryptedData = bytes.toString(decryptCrypto.enc.Utf8);
    return JSON.parse(decryptedData);
}

// Autrhorize

exports.Authorize = async (req, res, next)=>{
    try{
        const BearerToken= req.headers.authorization
        console.log(BearerToken)
        if(!BearerToken){
            return res.status(401).json({
                status:'Error',
                message:'Unauthorized'
            })
        }
        const token = BearerToken.split('Bearer ')[1];
        const tokenPayload = await readToken(token);

        if(tokenPayload.exp && tokenPayload.exp<Math.floor(Date.now()/1000)){
            return res.status(401).json({
                status:'Error',
                message:'Sorry, your token have been expired, try again later.'
            })
        }
        next()
    }catch(err){
        res.status(500).json({
            status:'Error',
            message:err.message
        })
    }

}