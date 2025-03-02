const { JWT_ACCESS_KEY } = process.env
const jwt = require("jsonwebtoken")
const wrapper = require("../utils/wrapper")
const client = require("../configs/redis")
module.exports = {
	authentication: async (request, response, next) => {
		try {
			let token = request.headers.authorization

			if (!token) {
				return wrapper.response(response, 403, "Please Login First", null)
			}

			token = token.split(" ")[1]
			const checkBlacklistToken = await client.get(`accessToken: ${token}`)
			if (checkBlacklistToken) {
				return wrapper.response(response, 403, "Token Expired", null)
			}

			jwt.verify(token, JWT_ACCESS_KEY, (error, result) => {
				if (error) {
					return wrapper.response(response, 403, error.message, null)
				}

				// Store decoded token information in request object
				request.decodeToken = request.user = result
				next()
			})
		} catch (error) {
			console.log(error)
			return wrapper.response(response, 500, "Internal Server Error", null)
		}
	},
}
