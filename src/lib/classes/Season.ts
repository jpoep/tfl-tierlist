export type Season = {
	number: number;
	name: string | null;
	startDate: Date;
	endDate: Date | null;
	leagues: {
		rank: number;
		name: string;
		players: Player[];
		matches: {
			player1: ParticipatingPlayer;
			player2: ParticipatingPlayer;
			date: Date;
			winner: Player | null;
			kills: {
				fainter: Pokemon | null;
				faintee: Pokemon;
			}[];
			score: {
				player1Score: number;
				player2Score: number;
			};
			vodLink: string;
			showdownReplayLink: string;
		}[];
	}[];
	tierlist: Tier[];
	pickRules: {
		tiers: Tier[];
		picks: number;
	}[];
	scheduleRules: {
		matchTurnus: Date;
		rounds: number;
		playoffs: boolean;
		midSeasonTournament: boolean;
	};
	ratingRules: {
		scorePerWin: number;
		scorePerDraw: number;
		scorePerLoss: number;
	};
	clauses: {
		title: string | null;
		description: string;
	}[];
};

type Pokemon = {
	id: string;
};

type Tier = {
	rank: number;
	name: string;
	flavorText: string;
	emptySearchText: string;
	pokemon: Pokemon[];
};

type Player = {
	teamName: string;
	teamLogo: string;
	playerName: string;
	pokemon: Pokemon[];
};

type Stats = {
	hp: number;
	atk: number;
	def: number;
	spatk: number;
	spdef: number;
	speed: number;
};

type ParticipatingPlayer = {
	player: Player;
	roster: {
		pokemon: Pokemon;
		nickname: string | null;
		shiny: boolean;
		evs: Stats;
		ivs: Stats;
		nature: string;
		ability: string;
		moves: string[];
		item: string;
	}[];
};
