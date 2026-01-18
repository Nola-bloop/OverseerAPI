import con from "../overseer.db.js"

export default {
	InsertCampaign : async (name) => {
		return new Promise((resolve, reject) =>{
			con.query(`INSERT INTO campaigns (name) VALUES (?)`, [name], (e, results) => {
				if (!e) resolve({response:"success."})
				else reject(e)
			})
		})
	},
	InsertChapterGroup : async (name, campaign) => {
		return new Promise((resolve, reject) =>{
			con.query(`INSERT INTO chapter_groups (name, campaign) VALUES (?, ?)`, [name, campaign], (e, results) => {
				if (!e) resolve({response:"success."})
				else reject(e)
			})
		})
	},
	InsertChapter : async (name, isCanon, dc_channel_id, campaign, chapter_group) => {
		return new Promise((resolve, reject) =>{
			con.query(`INSERT INTO chapters (name, isCanon, dc_channel_id, campaign, chapter_group) VALUES (?, ?, ?, ?, ?)`, [name, isCanon, dc_channel_id, campaign, chapter_group], (e, results) => {
				if (!e) resolve({response:"success."})
				else reject(e)
			})
		})
	},
	InsertMessage : async (message, chapter, speaker, date_sent, thread) => {
		return new Promise((resolve, reject) =>{
			con.query(`INSERT INTO messages (message, chapter, speaker, date_sent, thread) VALUES (?, ?, ?, ?, ?)`, [message, chapter, speaker, date_sent, thread], (e, results) => {
				if (!e) resolve({response:"success."})
				else reject(e)
			})
		})
	},
	InsertCharacter : async (name, boon, bio, campaign, profile_picture, player) => {
		return new Promise((resolve, reject) =>{
			con.query(`INSERT INTO characters (name, boon, bio, campaign, profile_picture, player) VALUES (?, ?, ?, ?, ?, ?)`, [name, boon, bio, campaign, profile_picture, player], (e, results) => {
				if (!e) resolve({response:"success."})
				else reject(e)
			})
		})
	},
	InsertThread : async (name) => {
		return new Promise((resolve, reject) =>{
			con.query(`INSERT INTO characters (name) VALUES (?)`, [name], (e, results) => {
				if (!e) resolve({response:"success."})
				else reject(e)
			})
		})
	},
}