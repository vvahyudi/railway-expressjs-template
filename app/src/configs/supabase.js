const { SUPABASE_URL, SUPABASE_KEY } = process.env
const { createClient } = require("@supabase/supabase-js")
const option = {
	auth: {
		persistSession: false,
	},
}

const supabaseURL = SUPABASE_URL
const supabaseKey = SUPABASE_KEY

const supabase = createClient(supabaseURL, supabaseKey, option)

module.exports = supabase
