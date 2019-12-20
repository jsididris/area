import AbstractReaction from "../AbstractReaction";
import {Reaction} from "../../models/Reaction";
import TwitterService from "../../services/TwitterService";

class RetweetReaction extends AbstractReaction {
	constructor() {
		super();
		this._service = TwitterService;
		this._name = "TwitterRetweetReaction";
		this._litteralName = "Retweet a post";
		this._description = "Retweet a post on Twitter";

		this._configFields = [
						{name: "Tweet ID (required)", variable: "tweet_id", type: "string", description: "The ID of the tweet to like"}
				];
	}

	protected async runReaction(reaction: Reaction, data: any): Promise<void> {
		// Extract from the reaction config the tweet to like
		const reactionConfig = reaction.config;
				var tweetId = reactionConfig['tweet_id'];

		if (!reactionConfig['tweet_id'])
						return;

		// Replace all templates variables into `textToSend` by her corresponding values received from action into `data`
		tweetId = this.evaluateTemplates(tweetId, data);

		// Send the message using Telegram service
				await TwitterService.retweet(tweetId).catch(err => console.log(err));
	}
}

export default new RetweetReaction();