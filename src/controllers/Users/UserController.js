const UserModel = require('../../models/Users/UserModel')
const UserRegistrationService = require('../../services/Users/UserRegistrationService')
const UserLoginService = require('../../services/Users/UserLoginService')
const UserProfileDetailService = require('../../services/Users/UserProfileDetailService')
const UserProfileUpdateService = require('../../services/Users/UserProfileUpdateService')

exports.UserRegistration = async (req, res) => {
    const result = await UserRegistrationService(req, UserModel);
    res.status(200).json(result);
}

exports.UserLogin = async (req, res) => {
    const result = await UserLoginService(req, UserModel)
    res.status(200).json(result);
}

exports.UserProfileDetail = async (req, res) => {
    const result = await UserProfileDetailService(req, UserModel)
    res.status(200).json(result)
}

exports.UserProfileUpdate = async (req, res) => {
    const result = await UserProfileUpdateService(req, UserModel)
    res.status(200).json(result);
}