import model from "../models/clusterInput.model.js"
import readModel from "../models/clusterOutput.model.js"
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

		let chapter = readModel.ReadChapterGroupByCampaignAndName(req.query.campaign, req.query.name)

		if (chapter) return {response:"Nothing to do."}

		return await model.InsertChapterGroup(req.query.name, req.query.campaign)
	},
	InsertChapter : async (req) => {
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
			date_sent,
			thread
		} = req.body;

		if (
			!message ||
			!dc_message_id ||
			!chapter ||
			!speaker ||
			!date_sent
		) {
			return { response: "missing body param" };
		}

		let messageTemp = readModel.ReadMessageFromDiscordId(dc_message_id);

		if (messageTemp) {
			return {response:"Message already exists!"}
			console.log(messageTemp)
		}

		return await model.InsertMessage(message, dc_message_id, chapter, speaker, date_sent, thread)
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
		const {
			name,
			dc_thread_id
		} = req.body;
		if (
			!name ||
			!dc_thread_id
		) return {response:"missing query param"}

		return await model.InsertThread(name, dc_thread_id)
	},
}