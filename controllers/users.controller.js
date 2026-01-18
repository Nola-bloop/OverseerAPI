import model from "../models/users.model.js"
import argon2 from "argon2";

export default {
	Create : async (req) => {
		if (
			!req.query.discordId ||
			!req.query.discordUsername ||
			!req.query.passwordClear
		) return {response:"missing query param"}

		const hash = await argon2.hash(req.query.passwordClear);

		const user = await model.ReadId(req.params.discordId)
		if (user) {
			await model.SetNewPasswordHash(user.id, hash)
		}else{
			await model.Create(
				req.query.discordId, 
				req.query.discordUsername, 
				hash
			)
		}
		return {response:"success"}

	},
	ReadId : async (req) => {
		if (
			!req.params.id
		) return {response:"missing param"}

		let user = await model.ReadUserId(req.params.id)
		return user ?? {response:"No user found."}
	},
	ReadDiscordId : async (req) => {
		if (
			!req.params.discordId
		) return {response:"missing param"}

		const user = await model.ReadId(req.params.discordId)
		return user
	},
	CheckCredPair : async (req) => {
		if (
			!req.query.discordId ||
			!req.query.passwordClear
		) return {response:"missing query param"}

		const user = await model.ReadId(req.params.discordId)
		if (!user) return {response:false}

		const isValid = await argon2.verify(user.passwordHash, req.query.passwordClear);
		return {response: isValid}
	},
	ReadIdInternal : async (id) => {
		const user = await model.ReadUserId(userId);

		return user ?? {response:"No user found."};
    }
}