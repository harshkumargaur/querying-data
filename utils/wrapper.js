const wrapper = (fun)=>{
    return async function(req,res,next){
        try {
            await fun(req,res,next)
        } catch (error) {
            next(error)
        }
    }
}

module.exports=wrapper;