import model from "../models/clusterOutput.model.js"
import insertModel from "../models/clusterInput.model.js"

const internals = {
	ReadAnyId : async(table, id) => {
		let thing = await model.ReadAnyId(table, id)
		return thing ?? {response:"Nothing found."}
	},
	BuildMessageObject : async(message) => {
		if (!message) return {response:"No message found."}

		let speaker = await internals.ReadAnyId("characters", message.speaker)
		let thread = await internals.ReadAnyId("threads", message.thread)

		message.speaker = speaker
		message.thread = thread

		return message
	},
	BuildChapterObject : async(chapter, skipMessages) => {
		if (!chapter) return {response:"No chapter found."}

		let messages
		if (skipMessages === true){
			console.log("skipping") 
			messages = "unloaded"
		}
		else{
			messages = await model.ReadMessagesByChapterId(chapter.id)
			messages = await Promise.all(
				messages.map(
					m => internals.BuildMessageObject(m)
				)
			)
		}

		chapter.messages = messages ?? []

		console.log("chapter GET 2:")
		console.log(chapter)

		return chapter
	},
	BuildChapterGroupObject : async (chapterGroup) => {
		if (!chapterGroup) return {response:"No chapter group found."}

		let chapters = await model.ReadChaptersByChapterGroupId(chapterGroup.id)

		chapterGroup.chapters = chapters

		for(let i = 0; i < chapterGroup.chapters.length; i++){
			chapterGroup.chapters[i].messages = "unloaded"
		}

		return chapterGroup
	},
	BuildCampaignObject : async(campaign) =>{
		if (!campaign) return {response:"No campaign found."}

		let chapterGroups = await model.ReadChapterGroupsByCampaignId(campaign.id)
		let chapters = await model.ReadChaptersFromCampaignId(campaign.id)

		chapterGroups.push({
			id: 0,
			name:"Uncategorized",
		})

		for(let i = 0; i < chapterGroups.length; i++){
			chapterGroups[i].chapters = []
		}

		const groupMap = new Map()
		chapterGroups.forEach(g => groupMap.set(g.id, g))

		chapters.forEach(ch => {
		    ch.messages = "unloaded"
		    groupMap.get(ch.chapter_group).chapters.push(ch)
		})

		campaign.chapter_groups = chapterGroups

		return campaign
	},
}
export { internals }



export default {
	//simple reads
	ReadCharacterId : async (req) => {
		if (
			!req.params.id
		) return {response:"missing param"}

		return await internals.ReadAnyId("characters", req.params.id)
	},
	ReadCharacterFromCampaignAndName : async (req) => {
		if (
			!req.params.campaignId ||
			!req.params.name
		) return {response:"missing param"}

		let character = await model.ReadCharacterFromCampaignAndName(req.params.campaignId, req.params.name)

		if (!character) await insertModel.InsertCharacter(req.params.name, "...", "...", req.params.campaignId)

		character = await model.ReadCharacterFromCampaignAndName(req.params.campaignId, req.params.name)

		return character
	},
	ReadThreadId : async (req) => {
		if (
			!req.params.id
		) return {response:"missing param"}

		return await internals.ReadAnyId("threads", req.params.id)
	},
	ReadThreadFromDiscordId : async (req) => {

		if (
			!req.body.threadId
		) return {response:"missing body"}

		let thread = await model.ReadThreadFromDiscordId(req.body.threadId)

		console.log("req.body.name:")
		console.log(req.body.name)

		if (!thread && req.body.name) {
			await insertModel.InsertThread({body : {name:req.body.name, dc_thread_id:req.body.threadId}})
			thread = await model.ReadThreadFromDiscordId(req.body.threadId)
		}
		console.log("thread")
		console.log(thread)

		return thread
	},

	//modular reads
	ReadMessageId : async (req) => {
		if (
			!req.params.id
		) return {response:"missing param"}
		let message = await internals.ReadAnyId("messages", req.params.id)

		return await internals.BuildMessageObject(message)
	},
	ReadLatestMessagesFromChapter : async (req) => {
		//console.log("entered ReadLatestMessagesFromChapter")
		if (
			!req.params.chapterId
		) return {response:"missing param"}

		let messages = await model.ReadLatestMessagesFromChapter(req.params.chapterId)
		//console.log("messages:")
		//console.log(messages)
		messages = await Promise.all(
			messages.map(
				m => internals.BuildMessageObject(m)
			)
		)
		//console.log("messages2:")
		//console.log(messages)
		return messages
	},
	ReadChapterId : async (req) => {
		if (
			!req.params.id
		) return {response:"missing param"}

		let chapter = await internals.ReadAnyId("chapters", req.params.id)
		console.log("chapter id GET:")
		console.log(chapter)
		return await internals.BuildChapterObject(chapter)
	},
	ReadChapterByCampaignAndDiscordId : async (req) => {
		if (
			!req.params.campaignId ||
			!req.params.dc_channel_id
		) return {response:"missing param"}
		let chapter = await model.ReadChapterByCampaignAndDiscordId(req.params.campaignId, req.params.dc_channel_id)

		return await internals.BuildChapterObject(chapter)
	},
	ReadAllChaptersFromCampaign : async (req) => {
		if (
			!req.params.campaignId
		) return {response:"missing param"}
		let chapters = await model.ReadAllChaptersFromCampaign(req.params.campaignId)

		if (!chapters || chapters.length === 0) return []

		chapters = await Promise.all(
			chapters.map(
				ch => internals.BuildChapterObject(ch, true)
			)
		)

		return chapters
	},
	ReadChapterGroupId : async (req) => {
		if (
			!req.params.id
		) return {response:"missing param"}

		let chapterGroup = await internals.ReadAnyId("chapter_groups", req.params.id)

		return await internals.BuildChapterGroupObject(chapterGroup)
	},
	ReadChapterGroupByPair : async (req) => {
		if (
			!req.params.campaignId ||
			!req.params.name
		) return {response:"missing param"}

		let chapterGroup = await model.ReadChapterGroupByPair(req.params.campaignId, req.params.name)
		return await internals.BuildChapterGroupObject(chapterGroup)
	},
	ReadCampaignId : async (req) => {
		if (
			!req.params.id
		) return {response:"missing param"}

		let campaign = await internals.ReadAnyId("campaigns", req.params.id)

		return await internals.BuildCampaignObject(campaign)
	},
	ReadCampaignGuild : async (req) => {
		if (
			!req.params.dc_guild_id
		) return {response:"missing param"}

		let campaign = await model.ReadCampaignByGuildId(req.params.dc_guild_id)

		return await internals.BuildCampaignObject(campaign)
	},
	ReadAllCampaigns : async (req) => {
		return await model.ReadAllCampaigns()
	},
}