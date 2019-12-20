import TelegramSendMessageReaction from "./Telegram/SendMessageReaction";
import OutlookSendMail from "./Outlook/SendNewMail";
import SlackSendMessageReaction from "./Slack/SendMessageReaction";
import SlackCreateChannelReaction from "./Slack/CreateChannelReaction";
import SlackJoinChannelReaction from "./Slack/JoinChannelReaction";
import SlackSetPresenceReaction from "./Slack/SetPresenceReaction";
import SlackAddReminderReaction from "./Slack/AddReminderReaction";
import NexmoSendSmsReaction from "./Nexmo/SendSmsReaction";
import TwitterLikeTweetReaction from "./Twitter/LikeTweetReaction"
import TwitterPostTweetReaction from "./Twitter/PostTweetReaction"
import TwitterRetweetReaction from "./Twitter/RetweetReaction"
import WebHookGetReaction from "./WebHook/WebHookGetReaction";
import WebHookPostReaction from "./WebHook/WebHookPostReaction";
import SpotifyAddSongToPlaylistReaction from "./Spotify/AddSongToPlaylist"

export default {
	TelegramSendMessageReaction,
	OutlookSendMail,
	SlackSendMessageReaction,
  SlackCreateChannelReaction,
  SlackJoinChannelReaction,
  SlackSetPresenceReaction,
  SlackAddReminderReaction,
  NexmoSendSmsReaction,
	TwitterLikeTweetReaction,
	TwitterPostTweetReaction,
	TwitterRetweetReaction,
	WebHookGetReaction,
	WebHookPostReaction,
	SpotifyAddSongToPlaylistReaction
}