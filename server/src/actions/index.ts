import TelegramNewMessageReceivedAction from './Telegram/NewMessageReceivedAction';
import TrelloNewNotificationAction from './Trello/NewNotificationAction';
import TrelloNewBoardAction from './Trello/NewBoardAction';
import TrelloNewCardAction from './Trello/NewCardAction';
import OutlookNewMailReceived from './Outlook/NewMailReceivedAction';
import OutlookNewEventAction from './Outlook/NewEventAction';
import PingDownAction from "./Ping/IsDownAction";
import SlackNewChannelAction from "./Slack/NewChannelAction";
import SlackUserJoinedAction from "./Slack/UserJoinedAction";
import DiscordNewGuildAction from "./Discord/NewGuildAction";
import TwitterNewTweetAction from "./Twitter/NewTweetAction";
import ClockAction from "./Clock/ClockAction";
import IntraNewNotificationAction from "./Intra/NewNotificationAction";
import IntraGPAChangeAction from "./Intra/GPAChangeAction";
import IntraCreditChangeAction from "./Intra/CreditChangeAction";
import EtherscanNewRopstenTransaction from "./Etherscan/NewRopstenTransaction";
import EtherscanNewMainnetTransaction from "./Etherscan/NewMainnetTransaction";
import SpotifyNewFollowerAction from "./Spotify/NewFollowerAction"
import InstagramNewPublications from "./Instagram/NewPublications";
import InstagramNewComment from "./Instagram/NewComment";
import CustomProtocolNewPost from "./CustomProtocol/NewPost";
import CryptoCheckPriceAction from "./Crypto/CheckPrice";
import TwitchNewStream from "./Twitch/NewStreamAction";

export default {
	TelegramNewMessageReceivedAction,
	TrelloNewNotificationAction,
	TrelloNewBoardAction,
	TrelloNewCardAction,
	OutlookNewMailReceived,
	OutlookNewEventAction,
	PingDownAction,
  SlackNewChannelAction,
  SlackUserJoinedAction,
  DiscordNewGuildAction,
	TwitterNewTweetAction,
	ClockAction,
	IntraNewNotificationAction,
	IntraGPAChangeAction,
	IntraCreditChangeAction,
	EtherscanNewMainnetTransaction,
	EtherscanNewRopstenTransaction,
	SpotifyNewFollowerAction,
	InstagramNewPublications,
	InstagramNewComment,
	CustomProtocolNewPost,
	CryptoCheckPriceAction,
	TwitchNewStream
}
