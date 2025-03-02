const bcrypt = require("bcrypt")
const wrapper = require("../utils/wrapper")
const userModel = require("../models/user")

module.exports = {
	addUser: async (request, response) => {
		try {
			const { username, password } = request.body
			const setData = {
				username,
				password,
			}
			const salt = bcrypt.genSaltSync(10)
			const hashedPassword = bcrypt.hashSync(setData.password, salt)
			setData.password = hashedPassword
			await userModel.addUser(setData)
			return wrapper.response(response, 200, "Success Add User", null)
		} catch (error) {
			return wrapper.response(response, 500, error.message, error)
		}
	},
}
