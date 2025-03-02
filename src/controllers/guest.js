const guestModel = require("../models/guest")
const wrapper = require("../utils/wrapper")

const convertToSlug = (text) => {
	return text
		.toLowerCase()
		.trim()
		.replace(/\s+/g, "-")
		.replace(/[^\w-]+/g, "")
		.replace(/--+/g, "-")
		.replace(/^-+/, "")
		.replace(/-+$/, "")
}

module.exports = {
	getAllGuest: async (request, response) => {
		try {
			let { page, limit, sort, search } = request.query
			page = +page
			limit = +limit
			const totalData = await guestModel.getCountGuest(search)
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
			const result = await guestModel.getAllGuest(
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
	getGuestBySlug: async (request, response) => {
		try {
			const { slug } = request.params
			const result = await guestModel.getGuestBySlug(slug)
			if (result.data.length < 1) {
				return wrapper.response(
					response,
					404,
					`Guest by ${slug} not found`,
					result.data,
				)
			}
			return wrapper.response(response, 200, "Success Get Data", result.data[0])
		} catch (error) {
			return wrapper.response(response, 500, error.message, error)
		}
	},
	addGuest: async (request, response) => {
		try {
			const { name, address, phone } = request.body

			if (!name) {
				return wrapper.response(response, 400, "Name is required", null)
			}

			let slug = convertToSlug(name)

			// Check existing slug
			const existingGuest = await guestModel.getGuestBySlug(slug)

			if (existingGuest.data && existingGuest.data.length > 0) {
				// Jika nama sudah ada, tambahkan angka di belakangnya
				const count = existingGuest.data.length + 1
				slug = `${slug}-${count}`
			}

			const setData = {
				name,
				slug,
				address,
				phone,
			}

			const result = await guestModel.addGuest(setData)

			return wrapper.response(response, 200, "Success Add Data", result.data[0])
		} catch (error) {
			return wrapper.response(response, 500, error.message, error)
		}
	},
	updateGuest: async (request, response) => {
		try {
			const { slug } = request.params
			const { name, address, phone } = request.body

			// Check if guest exists
			const checkSlug = await guestModel.getGuestBySlug(slug)
			if (checkSlug.data.length < 1) {
				return wrapper.response(response, 404, "Guest not found", null)
			}

			// Generate new slug from name
			let newSlug = convertToSlug(name)

			// Only check for duplicate slugs if the name has changed
			if (newSlug !== slug) {
				// Check existing slug
				const existingGuest = await guestModel.getGuestBySlug(newSlug)

				if (existingGuest.data && existingGuest.data.length > 0) {
					// If the slug already exists, add a counter at the end
					const count = existingGuest.data.length + 1
					newSlug = `${newSlug}-${count}`
				}
			}

			const setData = {
				name,
				slug: newSlug,
				address,
				phone,
			}

			// Update using the original slug as identifier
			const result = await guestModel.updateGuest(slug, setData)

			return wrapper.response(
				response,
				200,
				"Success Update Data",
				result.data[0],
			)
		} catch (error) {
			return wrapper.response(response, 500, error.message, error)
		}
	},
	deleteGuest: async (request, response) => {
		try {
			const { slug } = request.params
			const checkSlug = await guestModel.getGuestBySlug(slug)
			if (checkSlug.data.length < 1) {
				return wrapper.response(response, 404, "Guest not found", null)
			}
			const result = await guestModel.deleteGuest(slug)
			return wrapper.response(response, 200, "Success Delete Data", result.data)
		} catch (error) {
			return wrapper.response(response, 500, error.message, error)
		}
	},
}
