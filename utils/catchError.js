const CatchErrorFunc = controllerFunc = async (req, res, next) => {
    try  {
       await controllerFunc(req, res)
    }
    catch(err) {
        next(err)
    }
} 

module.exports = {CatchErrorFunc}