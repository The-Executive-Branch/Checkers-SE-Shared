import type { GameId, CheckerColor, Position, Player } from "./game.d.ts";

export type SavedMove = {
  //this is a blueprint used for each move that will be saved in the db
  from: Position;
  to: Position;
  capturedIds?: string[];
  kingId?: string;
  jumpFrom?: Position;
  nextPlayerTurn: CheckerColor;
};

export type SaveGameRequest = {
  //This is what the client sends when a game is finished and needs to be saved
  gameId: GameId;
  players: { red: Player; black: Player }; //if the player is a guest, the name will be saved instead of the username and names are stored in the DB as well
  winner: CheckerColor;
  moves: SavedMove[];
};

export type GameRecord = SaveGameRequest & {
  //this is what the server will return when a specfic game is requested, just adds the timestamp for when the game occured
  endedAt: string;
};

export type GameRecordSummary = Omit<GameRecord, "moves">; //this is for the initial records page listing each game with no moves, just the summary of the game

export type GetGameRecordsResponse = {
  //this is for finding a specific game and retrieving all its data including moves
  gameId: GameId;
};
