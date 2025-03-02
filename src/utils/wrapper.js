module.exports = {
	response: (response, status, message, data, pagination) => {
		const result = {
			status,
			message,
			data,
			pagination,
		}
		return response.status(status).json(result)
	},
}
