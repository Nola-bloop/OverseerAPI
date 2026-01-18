import con from "../overseer.db.js"

export default {
	ReadAnyId : async (table, id) => {
		return new Promise((resolve, reject) =>{
			con.query(`SELECT * FROM ${table} WHERE id = ?`, [id], (e, results) => {
				if (!e) resolve(results[0])
				else reject(e)
			})
		})
	},
	ReadMessagesByChapterId : async (id) => {
		return new Promise((resolve, reject) =>{
			con.query(`SELECT messages.* FROM messages INNER JOIN chapters ON messages.chapter = chapters.id WHERE chapters.id = ?`, [id], (e, results) => {
				if (!e) resolve(results)
				else reject(e)
			})
		})
	},
	ReadChaptersByChapterGroupId : async (id) => {
		return new Promise((resolve, reject) =>{
			con.query(`SELECT chapters.* FROM chapters INNER JOIN chapter_groups ON chapter.chapter_group = chapter_groups.id WHERE chapter_groups.id = ?`, [id], (e, results) => {
				if (!e) resolve(results)
				else reject(e)
			})
		})
	},
	ReadChapterGroupsByCampaignId : async (id) => {
		return new Promise((resolve, reject) =>{
			con.query(`SELECT chapter_groups.* FROM chapter_groups INNER JOIN campaigns ON chapter_groups.campaign = campaigns.id WHERE campaigns.id = ?`, [id], (e, results) => {
				if (!e) resolve(results)
				else reject(e)
			})
		})
	},
	ReadChaptersFromCampaignId : async (id) => {
		return new Promise((resolve, reject) =>{
			con.query(`SELECT chapters.* FROM chapters INNER JOIN chapter_groups ON chapters.chapter_group = chapter_groups.id INNER JOIN campaigns ON chapter_groups.campaign = campaigns.id WHERE campaigns.id = ?`, [id], (e, results) => {
				if (!e) resolve(results)
				else reject(e)
			})
		})
	},
}