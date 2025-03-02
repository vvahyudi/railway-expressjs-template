const supabase = require("../configs/supabase")

module.exports = {
	addUser: (data) =>
		new Promise((resolve, reject) => {
			supabase
				.from("tb_users")
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
