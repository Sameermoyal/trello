import userModel from "../model/userModel";
const confirmPremiumUpgrade = async (req, res) => {
    const userId = req.user.id;
    const user = await userModel.findById(userId);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    user.is_premium = true;
    await user.save();

    res.status(200).json({ message: "Premium plan activated!" });
};
