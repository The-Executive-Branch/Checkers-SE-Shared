export type GameId = string & { readonly __brand: "GameId" };

export type CheckerColor = "black" | "red";

export type Position = {
  row: number;
  col: number;
};

export type CheckerPiece = Position & {
  id: string;
  color: CheckerColor;
  isKing: boolean;
};

export type GameStatus =
  | { state: "waiting" }
  | { state: "inProgress" }
  | { state: "finished"; winner: CheckerColor };

export type ClientGameMessage = {
  type: "move";
  to: Position;
  from: Position;
  gameId: GameId;
};

export type ServerGameMessage =
  | {
      type: "gameState";
      pieces: CheckerPiece[];
      playerTurn: CheckerColor;
      playerColor: CheckerColor;
      status: GameStatus;
      gameId: GameId;
    }
  | {
      type: "moveResult";
      from: Position;
      to: Position;
      capturedIds: string[];
      kingId?: string;
      nextPlayerTurn: CheckerColor;
      jumpFrom?: Position;
      status: GameStatus;
      gameId: GameId;
    }
  | {
      type: "moveRejected";
      from: Position;
      to: Position;
      reason: string;
      gameId: GameId;
    };
