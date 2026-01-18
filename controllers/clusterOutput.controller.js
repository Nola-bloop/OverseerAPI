import model from "../models/clusterOutput.model.js"

const internals = {
	ReadAnyId : async(table, id) => {
		let thing = await model.ReadAnyId(table, id)
		return thing ?? {response:"Nothing found."}
	},
	ReadMessageId : async(id) => {
		let message = await this.ReadAnyId("messages", id)

		if (!message) return {response:"No message found."}

		let speaker = await internals.ReadCharacterId(message.speaker)
		let thread = await internals.ReadThreadId(message.thread)

		message.speaker = speaker
		message.thread = thread

		return message
	},
	ReadChapterId : async(id) => {
		let chapter = await this.ReadAnyId("chapters", id)

		if (!chapter) return {response:"No chapter found."}

		let messages = await model.ReadMessagesByChapterId(chapter.id)

		chapter.messages = messages

		return chapter
	},
	ReadChapterGroupId : async(id) => {
		let chapterGroup = await this.ReadAnyId("chapter_groups", id)

		if (!chapterGroup) return {response:"No chapter group found."}

		let chapters = await model.ReadChaptersByChapterGroupId(chapterGroup.id)

		chapterGroup.chapters = chapters

		for(let i = 0; i < chapterGroup.chapters.length; i++){
			chapterGroup.chapters[i].messages = "unloaded"
		}

		return chapterGroup
	},
	ReadCampaignId : async(id) => {
		let campaign = await this.ReadAnyId("chapter_groups", id)

		if (!campaign) return {response:"No chapter group found."}

		let chapterGroups = await model.ReadChapterGroupsByCampaignId(campaign.id)
		let chapters = await model.ReadChaptersFromCampaignId(campaign.id)


		campaign.chapter_groups = chapterGroups

		for(let i = 0; i < chapterGroups.length; i++){
			chapterGroup[i].chapters = []
		}

		for (let i = 0; i < chapters.length; i++){
			for (let k = 0; j < chapterGroups.length; j++){
				if (chapters[i].chapter_group === chapterGroups[j].id){
					chapters[i].messages = "unloaded"
					chapterGroups[j].chapters.push(chapters[i])
				}
			}
		}

		return campaign
	},
}


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

		return await internals.ReadChapterId(req.params.id)
	},
	ReadChapterGroupId : async (req) => {
		if (
			!req.params.id
		) return {response:"missing param"}

		return await internals.ReadChapterGroupId(req.params.id)
	},
	ReadCampaignId : async (req) => {
		if (
			!req.params.id
		) return {response:"missing param"}

		return await internals.ReadCampaignId(req.params.id)
	},
}