const commentModel = require("../models/comment")
const wrapper = require("../utils/wrapper")

module.exports = {
	getAllComent: async (request, response) => {
		try {
			let { page, limit, sort, search } = request.query
			page = +page
			limit = +limit
			const totalData = await commentModel.getCountComment(search)
			const totalPage = Math.ceil(totalData / limit)
			const pagination = {
				page,
				limit,
				totalPage,
				totalData,
			}
			const offset = (page - 1) * limit
			let sortBy = "name"
			let sortType = "asc"
			if (sort) {
				sortBy = sort.split(".")[0]
				sortType = sort.split(".")[1]
			}
			if (sortType.toLowerCase() === "asc") {
				sortType = true
			} else {
				sortType = false
			}
			const result = await commentModel.getAllComment(
				offset,
				limit,
				sortBy,
				search,
				sortType,
			)
			return wrapper.response(
				response,
				200,
				"Success Get Data",
				result.data,
				pagination,
			)
		} catch (error) {
			return wrapper.response(response, 500, error.message, error)
		}
	},
	getCommentById: async (request, response) => {
		try {
			const { id } = request.params
			const result = await commentModel.getCommentById(id)
			if (result.data.length < 1) {
				return wrapper.response(
					response,
					404,
					`Comment by ${id} not found`,
					result.data,
				)
			}
			return wrapper.response(response, 200, "Success Get Data", result.data[0])
		} catch (error) {
			return wrapper.response(response, 500, error.message, error)
		}
	},
	addComment: async (request, response) => {
		try {
			const { name, content } = request.body
			const setData = {
				name,
				content,
			}
			const result = await commentModel.addComment(setData)
			return wrapper.response(
				response,
				200,
				"Success Add Comment",
				result.data[0],
			)
		} catch (error) {
			return wrapper.response(response, 500, error.message, error)
		}
	},
}
