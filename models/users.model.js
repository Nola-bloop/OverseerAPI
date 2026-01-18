import con from "../overseer.db.js"

export default {
	Create : async (dc_user_id, dc_username, password_hash) => {
		return new Promise((resolve, reject) =>{
			con.query("INSERT INTO users (dc_user_id, dc_username, password_hash) VALUES (?)", [dc_user_id, dc_username, password_hash], (e, results) => {
				if (!e) resolve("success.")
				else reject(e)
			})
		})
	},
	ReadId : async (id) => {
		return new Promise((resolve, reject) => {
			con.query("SELECT * FROM users WHERE users.id = ?", [id], (e, results) => {
				if (!e) resolve(results[0])
				else reject(e)
			})
		})
	},
	ReadDiscordId : async (discordId) => {
		return new Promise((resolve, reject) => {
			con.query("SELECT * FROM users WHERE users.dc_user_id = ?", [discordId], (e, results) => {
				if (!e) resolve(results[0])
				else reject(e)
			})
		})
	},
}