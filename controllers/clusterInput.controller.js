import model from "../models/clusterInput.model.js"
import internals from "./clusterOutput.controller.js"

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

		let chapter = internals.ReadChapterGroupByCampaignAndName(req.query.campaign, req.query.name)

		if (chapter) return {response:"Nothing to do."}

		return await model.InsertChapterGroup(req.query.name, req.query.campaign)
	},
	InsertChapter : async (req) => {
		console.log(`${req.query.name}, ${req.query.isCanon}, ${req.query.dcChannelId}, ${req.query.campaign}`)
		if (
			!req.query.name ||
			!req.query.isCanon ||
			!req.query.dcChannelId ||
			!req.query.campaign
		) return {response:"missing query param"}

		return await model.InsertChapter(req.query.name, req.query.isCanon, req.query.dcChannelId, req.query.campaign, req.query.chapterGroup)
	},
	UpdateChapterToGroupRelation : async (req) => {
		if (
			!req.query.chapterGroup ||
			!req.query.chapterId
		) return {response:"missing query param"}

		return await model.InsertChapter(req.query.chapterGroup, req.query.chapterId)
	},
	InsertMessage : async (req) => {
		const {
			message,
			dc_message_id,
			chapter,
			speaker,
			dateSent,
			thread
		} = req.body;

		if (
			!message ||
			!dc_message_id ||
			!chapter ||
			!speaker ||
			!dateSent
		) {
			return { response: "missing body param" };
			console.log(req.body)
		}

		return await model.InsertMessage(message, dc_message_id, chapter, speaker, dateSent, thread)
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