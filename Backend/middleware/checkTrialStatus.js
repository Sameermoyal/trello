const userModel=require('../model/userModel')

module.exports= async (req, res, next) => {
    const userId = req.user.id; 
    const user = await userModel.findById(userId);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const currentDate = new Date();

    
    if (currentDate > user.trial_end_date && !user.is_premium) {
        return res.status(403).json({ 
            message: "Free trial expired. Please upgrade to a premium plan." 
        });
    }

   
    next();
};

