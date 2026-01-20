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
	ReadCharacterFromCampaignAndName : async (campaignId, name) => {
		return new Promise((resolve, reject) =>{
			con.query(`SELECT characters.* FROM characters WHERE characters.campaign = ? AND characters.name = ?`, [campaignId, name], (e, results) => {
				if (!e) resolve(results[0])
				else reject(e)
			})
		})
	},
	ReadMessagesByChapterId : async (id) => {
		return new Promise((resolve, reject) =>{
			con.query(`SELECT messages.* FROM messages INNER JOIN chapters ON messages.chapter = chapters.id WHERE chapters.id = ? ORDER BY messages.date_sent`, [id], (e, results) => {
				if (!e) resolve(results)
				else reject(e)
			})
		})
	},
	ReadLatestMessagesFromChapter : async (id) => {
		//get latest message from each thread of each chapter
		return new Promise((resolve, reject) =>{
			con.query(`SELECT *
				FROM (
				    SELECT
				        m.*,
				        ROW_NUMBER() OVER (
				            PARTITION BY m.thread
				            ORDER BY m.date_sent DESC
				        ) AS rn
				    FROM messages m
				    WHERE m.chapter = ?
				      AND m.thread IS NOT NULL
				) ranked
				WHERE rn = 1`
				,[id], (e, results) => {
				if (!e) resolve(results)
				else reject(e)
			})
		})
	},
	ReadChaptersByChapterGroupId : async (id) => {
		return new Promise((resolve, reject) =>{
			con.query(`SELECT chapters.* FROM chapters INNER JOIN chapter_groups ON chapters.chapter_group = chapter_groups.id WHERE chapter_groups.id = ? ORDER BY id`, [id], (e, results) => {
				if (!e) resolve(results)
				else reject(e)
			})
		})
	},
	ReadChapterGroupsByCampaignId : async (id) => {
		return new Promise((resolve, reject) =>{
			con.query(`SELECT chapter_groups.* FROM chapter_groups INNER JOIN campaigns ON chapter_groups.campaign = campaigns.id WHERE campaigns.id = ? ORDER BY id`, [id], (e, results) => {
				if (!e) resolve(results)
				else reject(e)
			})
		})
	},
	ReadChaptersFromCampaignId : async (id) => {
		return new Promise((resolve, reject) =>{
			con.query(`SELECT chapters.* FROM chapters WHERE chapters.campaign = ? ORDER BY id`, [id], (e, results) => {
				if (!e) resolve(results)
				else reject(e)
			})
		})
	},
	ReadCampaignByGuildId : async (dc_guild_id) => {
		return new Promise((resolve, reject) =>{
			con.query(`SELECT campaigns.* FROM campaigns WHERE dc_guild_id = ?`, [dc_guild_id], (e, results) => {
				if (!e) resolve(results[0])
				else reject(e)
			})
		})
	},
	ReadChapterByCampaignAndDiscordId : async (campaignId, dc_channel_id) => {
		return new Promise((resolve, reject) =>{
			con.query(`SELECT chapters.* FROM chapters INNER JOIN chapter_groups ON chapters.chapter_group = chapter_groups.id INNER JOIN campaigns ON chapter_groups.campaign = campaigns.id WHERE campaigns.id = ? AND chapters.dc_channel_id = ?`, [campaignId, dc_channel_id], (e, results) => {
				if (!e) resolve(results[0])
				else reject(e)
			})
		})
	},
	ReadChapterGroupByPair : async (campaignId, name) => {
		return new Promise((resolve, reject) =>{
			con.query(`SELECT chapter_groups.* FROM chapter_groups WHERE campaigns.id = ? AND name = ?`, [campaignId, name], (e, results) => {
				if (!e) resolve(results[0])
				else reject(e)
			})
		})
	},
	ReadAllChaptersFromCampaign : async (campaignId) => {
		return new Promise((resolve, reject) =>{
			con.query(`SELECT chapters.* FROM chapters WHERE chapters.campaign = ?`, [campaignId], (e, results) => {
				if (!e) resolve(results)
				else reject(e)
			})
		})
	},
	ReadAllCampaigns : async () => {
		return new Promise((resolve, reject) =>{
			con.query(`SELECT campaigns.* FROM campaigns`, [], (e, results) => {
				if (!e) resolve(results)
				else reject(e)
			})
		})
	}
}