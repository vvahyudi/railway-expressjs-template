const supabase = require("../configs/supabase")

module.exports = {
	getUserByUsername: (username) =>
		new Promise((resolve, reject) => {
			supabase
				.from("tb_users")
				.select("*")
				.eq("username", username)
				.then((result) => {
					if (!result.error) {
						resolve(result)
					} else {
						reject(result)
					}
				})
		}),
}
