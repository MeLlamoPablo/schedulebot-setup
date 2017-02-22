import * as Discord from "discord.js";

let client: Discord.Client;

export async function getClientDetails(token: string): Promise<UserDetails|null> {
	try {

		client = new Discord.Client();
		await client.login(token);

		let result: UserDetails = {
			id: client.user.id,
			avatar: client.user.displayAvatarURL,
			username: client.user.username + "#" + client.user.discriminator
		};

		await client.destroy();

		return result;

	} catch (err) {

		if (err.message === "Incorrect login details were provided.") {
			return null;
		} else {
			throw err;
		}

	}
}

export async function getUserDetails(token: string, userID: string): Promise<UserDetails> {
	try {

		client = new Discord.Client();
		await client.login(token);

		let user = await client.fetchUser(userID);
		let result = {
			id: user.id,
			avatar: user.displayAvatarURL,
			username: user.username + "#" + user.discriminator
		};

		await client.destroy();

		return result;

	} catch (err) {
		throw err;
	}
}

export async function getChannelDetails(token: string, channelID: string)
: Promise<ChannelDetails|null> {
	try {

		client = new Discord.Client();
		await client.login(token);

		let channel: any = client.channels.get(channelID);

		await client.destroy();

		return channel ? {
			id: channel.id,
			name: channel.name,
			server: channel.guild.name
		} : null;

	} catch (err) {
		throw err;
	}
}

interface UserDetails {
	id: string
	avatar: string
	username: string
}

interface ChannelDetails {
	id: string,
	name: string,
	server: string
}