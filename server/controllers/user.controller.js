const userModel = require("../model/user.model");

const getUserHandler = async (req, res) => {
  try {
    console.log("Getting user profile for:", req.user);

    const user = await userModel.findById(req.user.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ data: user });
  } catch (error) {
    console.error("Can't find user", error);
    res.status(500).json({ message: "Server error" });
  }
};

const patchUserHandler = async (req, res) => {
  try {
    const { bio, avatarUrl, sosialLinks } = req.body;

    const user = await userModel
      .findByIdAndUpdate(
        req.user.userId,
        { bio, avatarUrl, sosialLinks },
        { new: true }
      )
      .select("-password");

    res.json({ data: user });
  } catch (error) {
    console.error("Can't update user", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteUserHandler = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.user.userId);
    res.json({ message: "User deleted" });
  } catch (error) {
    console.error("Can't delete user", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllUsersHandler = async (req, res) => {
  try {
    const users = await userModel.find({}).select("-password"); 
    res.json({ data: users });
  } catch (error) {
    console.error("Can't get all users", error);
    res.status(500).json({ message: "Server error" });
  }
};

const changeUserRoleHandler = async (req, res) => {
  try {
    const { userId, role } = req.body;
    if (!["client", "admin"].includes(role))
      return res.status(400).json({
        message: "Invalid role, Only client and admin roles are allowed",
      });

    const existingUser = await userModel.findById(userId);
    if (!existingUser)
      return res.status(404).json({ message: "User not found" });

    const updatedUser = await userModel
      .findByIdAndUpdate(userId, { role }, { new: true })
      .select("-password");

    res.json({
      message: `User role updated successfully to ${role}`,
      data: updatedUser,
    });
  } catch (error) {
    console.error("Can't change user role", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getUserHandler,
  patchUserHandler,
  deleteUserHandler,
  getAllUsersHandler,
  changeUserRoleHandler,
};
