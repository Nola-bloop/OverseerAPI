import con from "../overseer.db.js"

export default {
	InsertCampaign : async (name, dc_guild_id) => {
		return new Promise((resolve, reject) =>{
			con.query(`INSERT INTO campaigns (name, dc_guild_id) VALUES (?, ?)`, [name, dc_guild_id], (e, results) => {
				if (!e) resolve("success")
				else reject(e)
			})
		})
	},
	InsertChapterGroup : async (name, campaign) => {
		return new Promise((resolve, reject) =>{
			con.query(`INSERT INTO chapter_groups (name, campaign) VALUES (?, ?)`, [name, campaign], (e, results) => {
				if (!e) resolve("success")
				else reject(e)
			})
		})
	},
	UpdateChapterGroup : async (name, campaign, id) => {
		return new Promise((resolve, reject) =>{
			con.query(`UPDATE chapter_groups SET name = ?, campaign = ? WHERE id = ?`, [name, campaign, id], (e, results) => {
				if (!e) resolve("success")
				else reject(e)
			})
		})
	},
	InsertChapter : async (name, isCanon, dc_channel_id, campaign, chapter_group) => {
		return new Promise((resolve, reject) =>{
			con.query(`INSERT INTO chapters (name, isCanon, dc_channel_id, campaign, chapter_group) VALUES (?, ?, ?, ?, ?)`, [name, isCanon, dc_channel_id, campaign, chapter_group], (e, results) => {
				if (!e) resolve("success")
				else reject(e)
			})
		})
	},
	UpdateChapterToGroupRelation : async (chapter_group, id) => {
		return new Promise((resolve, reject) =>{
			con.query(`UPDATE chapters SET chapter_group = ? WHERE id = ?`, [chapter_group, id], (e, results) => {
				if (!e) resolve("success")
				else reject(e)
			})
		})
	},
	InsertMessage : async (message, dc_message_id, chapter, speaker, date_sent, thread) => {
		return new Promise((resolve, reject) =>{
			con.query(`INSERT INTO messages (message, dc_message_id, chapter, speaker, date_sent, thread) VALUES (?, ?, ?, ?, ?, ?)`, [message, dc_message_id, chapter, speaker, new Date(date_sent), thread], (e, results) => {
				if (!e) resolve("success")
				else reject(e)
			})
		})
	},
	InsertCharacter : async (name, boon, bio, campaign, profile_picture, player) => {
		return new Promise((resolve, reject) =>{
			con.query(`INSERT INTO characters (name, boon, bio, campaign, profile_picture, player) VALUES (?, ?, ?, ?, ?, ?)`, [name, boon, bio, campaign, profile_picture, player], (e, results) => {
				if (!e) resolve("success")
				else reject(e)
			})
		})
	},
	InsertThread : async (name, dc_thread_id) => {
		return new Promise((resolve, reject) =>{
			con.query(`INSERT INTO characters (name, dc_thread_id) VALUES (?, ?)`, [name, dc_thread_id], (e, results) => {
				if (!e) resolve("success")
				else reject(e)
			})
		})
	},
}