import model from "../models/clusterOutput.model.js"

const internals = {
	ReadAnyId : async(table, id) => {
		let thing = await model.ReadAnyId(table, id)
		return thing ?? {response:"Nothing found."}
	},
	ReadMessageId : async(id) => {
		let message = await internals.ReadAnyId("messages", id)

		if (!message) return {response:"No message found."}

		let speaker = await internals.ReadAnyId("characters", message.speaker)
		let thread = await internals.ReadAnyId("threads", message.thread)

		message.speaker = speaker
		message.thread = thread

		return message
	},
	BuildChapterObject : async(chapter) => {
		if (!chapter) return {response:"No chapter found."}

		let messages = await model.ReadMessagesByChapterId(chapter.id)

		for (let i = 0; i < messages.length; i++) {
    		messages[i] = await internals.ReadMessageId(messages[i].id)
		}


		chapter.messages = messages

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


		campaign.chapter_groups = chapterGroups

		for(let i = 0; i < chapterGroups.length; i++){
			chapterGroups[i].chapters = []
		}

		const groupMap = new Map()
		chapterGroups.forEach(g => groupMap.set(g.id, g))

		chapters.forEach(ch => {
		    ch.messages = "unloaded"
		    groupMap.get(ch.chapter_group).chapters.push(ch)
		})


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
	ReadThreadId : async (req) => {
		if (
			!req.params.id
		) return {response:"missing param"}

		return await internals.ReadAnyId("threads", req.params.id)
	},

	//modular reads
	ReadMessageId : async (req) => {
		if (
			!req.params.id
		) return {response:"missing param"}

		return await internals.ReadMessageId(req.params.id)
	},
	ReadChapterId : async (req) => {
		if (
			!req.params.id
		) return {response:"missing param"}

		let chapter = await internals.ReadAnyId("chapters", req.params.id)
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
				ch => {
					internals.BuildChapterObject(ch)
					ch.messages = "unloaded"
				}
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
}