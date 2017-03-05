export interface ExistingData {
	discord?: DiscordData
	settings?: SettingsData
	steamBots?: SteamBot[],
	heroku?: HerokuData,
	currentVersion?: string,
	newVersion?: string
}

interface DiscordData {
	admin: AdminData
	bot: BotData
}

interface AdminData {
	id: string
	username?: string
}

interface BotData {
	id?: string
	token: string
	username?: string
}

interface SettingsData {
	"name"?: string
	"prefix"?: string
	"readable-prefix"?: string
	"admin-app-prefix"?: string
	"delete-after-reply-time"?: number
	"quick-inhouse-command-name"?: string
	"quick-inhouse-event-name"?: string
	"game-generic-name"?: string
	"default-server"?: string
	"default-timezone"?: string
	"time-format"?: string
	"update-interval"?: number
	"mmr-update-interval"?: number
	"delete-after-reply"?: boolean
	"disallow-talking"?: boolean
	"add-inhouse-is-admin-command"?: boolean
	"quick-inhouse-enabled"?: boolean
	"disable-autostart"?: boolean
	"ticketing-enabled"?: boolean
	"mmr-enabled"?: boolean
	"mmr-enforce"?: boolean
	"master-channel"?: string
}

interface SteamBot {
	username: string
	password: string
	steamGuardEnabled: boolean
	steamGuardCode?: string
}

interface HerokuData {
	enabled: boolean
	key?: string
}