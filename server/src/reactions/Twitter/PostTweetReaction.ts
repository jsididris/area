import AbstractReaction from "../AbstractReaction";
import {Reaction} from "../../models/Reaction";
import TwitterService from "../../services/TwitterService";

class PostTweetReaction extends AbstractReaction {
	constructor() {
		super();
		this._service = TwitterService;
		this._name = "TwitterPostTweetReaction";
		this._litteralName = "Post a tweet";
		this._description = "Post a tweet on Twitter";

		this._configFields = [
						{name: "Tweet content (required)", variable: "tweet_content", type: "string", description: "The content of the tweet that will be posted"}
				];
	}

	protected async runReaction(reaction: Reaction, data: any): Promise<void> {
		// Extract from the reaction config the tweet to like
		const reactionConfig = reaction.config;
				var tweetContent = reactionConfig['tweet_content'];

		if (!reactionConfig['tweet_content'])
						return;

		// Replace all templates variables into `textToSend` by her corresponding values received from action into `data`
		tweetContent = this.evaluateTemplates(tweetContent, data);

		// Send the message using Telegram service
				await TwitterService.postTweet(tweetContent).catch(err => console.log(err));
	}
}

export default new PostTweetReaction();