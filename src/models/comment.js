const supabase = require("../configs/supabase")

module.exports = {
	getCountComment: (search) =>
		new Promise((resolve, reject) => {
			supabase
				.from("tb_comments")
				.select("*", { count: "exact" })
				.like("name", `%${search}%`)
				.then((result) => {
					if (!result.error) {
						resolve(result.count)
					} else {
						reject(result)
					}
				})
		}),
	getAllComment: (offset, limit, sortBy, search, sortType) =>
		new Promise((resolve, reject) => {
			supabase
				.from("tb_comments")
				.select("*")
				.range(offset, offset + limit - 1)
				.order(sortBy, { ascending: sortType })
				.like("name", `%${search}%`)
				.then((result) => {
					if (!result.error) {
						resolve(result)
					} else {
						reject(result)
					}
				})
		}),
	getCommentById: (id) =>
		new Promise((resolve, reject) => {
			supabase
				.from("tb_comments")
				.select("*")
				.eq("id", id)
				.then((result) => {
					if (!result.error) {
						resolve(result)
					} else {
						reject(result)
					}
				})
		}),
	addComment: (data) =>
		new Promise((resolve, reject) => {
			supabase
				.from("tb_comments")
				.insert([data])
				.select()
				.then((result) => {
					if (!result.error) {
						resolve(result)
					} else {
						reject(result)
					}
				})
		}),
}
