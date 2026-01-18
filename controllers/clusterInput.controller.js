import model from "../models/clusterInput.model.js"

let internals
internals = {

}

export default {
	InsertCampaign : async (req) => {
		if (
			!req.query.name ||
			!req.query.dc_guild_id
		) return {response:"missing query param"}

		return await model.InsertCampaign(req.query.name, req.query.dc_guild_id)
	},
	InsertChapterGroup : async (req) => {
		if (
			!req.query.name ||
			!req.query.campaign
		) return {response:"missing query param"}

		return await model.InsertChapterGroup(req.query.name, req.query.campaign)
	},
	InsertChapter : async (req) => {
		if (
			!req.query.name ||
			!req.query.isCanon ||
			!req.query.dcChannelId ||
			!req.query.campaign ||
			!req.query.chapterGroup
		) return {response:"missing query param"}

		return await model.InsertChapter(req.query.name, req.query.isCanon, req.query.dcChannelId, req.query.campaign, req.query.chapterGroup)
	},
	InsertMessage : async (req) => {
		if (
			!req.body.message ||
			!req.body.chapter ||
			!req.body.speaker ||
			!req.body.dateSent ||
			!req.body.thread
		) return {response:"missing body param"}

		const msg = escapeHTML(req.body.message)

		return await model.InsertMessage(msg, req.query.chapter, req.query.speaker, req.query.dateSent, req.query.thread)
	},
	InsertCharacter : async (req) => {
		if (
			!req.query.name ||
			!req.query.boon ||
			!req.query.bio ||
			!req.query.campaign
		) return {response:"missing query param"}

		return await model.InsertCharacter(req.query.name, req.query.boon, req.query.bio, req.query.campaign, req.query.profile_picture, req.query.player)
	},
	InsertThread : async (req) => {
		if (
			!req.query.name ||
			!req.query.dc_thread_id
		) return {response:"missing query param"}

		return await model.InsertThread(req.query.name, req.query.dc_thread_id)
	},
}