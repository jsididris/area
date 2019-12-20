import AbstractReaction from "../AbstractReaction";
import {Reaction} from "../../models/Reaction";
import SpotifyService from "../../services/SpotifyService";
import {Service} from "../../models/Service";

class RetweetReaction extends AbstractReaction {
	constructor() {
		super();
		this._service = SpotifyService;
		this._name = "SpotifyAddSongToPlaylistReaction";
		this._litteralName = "Add song to playlist";
		this._description = "Add a song to a playlist";

		this._configFields = [
						{name: "Song URI (required)", variable: "song_uri", type: "string", description: "The URI of the song to add"},
						{name: "Playlist ID (required)", variable: "playlist_id", type: "string", description: "The ID of the playlist to like"}
				];
	}

	protected async runReaction(reaction: Reaction, data: any): Promise<void> {
		// Extract from the reaction config the tweet to like
		const reactionConfig = reaction.config;
				var songUri = reactionConfig['song_uri'];
				var playlistId = reactionConfig['playlist_id'];

		if (!reactionConfig['song_uri'] || !reactionConfig['playlist_id'])
						return;

		// Replace all templates variables into `textToSend` by her corresponding values received from action into `data`
				playlistId = this.evaluateTemplates(playlistId, data);
				songUri = this.evaluateTemplates(songUri, data);

				// Send the message using Telegram service
				const reac = await Reaction.findOne({id: reaction.id}, {relations: ['action', 'action.area', 'action.area.user']});
		const user = reac.action.area.user;
				const service = await Service.findOne({user, class_name: this._service.getName()});

		const response = await SpotifyService.addSongToPlaylist(songUri, playlistId, service.token["access_token"]).catch(err => console.log(err));
		console.log(response);
	}
}

export default new RetweetReaction();