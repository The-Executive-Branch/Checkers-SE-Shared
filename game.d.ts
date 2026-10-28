export type GameId = string & { readonly __brand: "GameId" };

export type CheckerColor = "black" | "red";

export type Player =
  | {
      kind: "user";
      username: string;
    }
  | {
      kind: "guest";
      name: string;
    };

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

export type ClientMessage =
  | {
      type: "authenticate";
      sessionId: string;
    }
  | {
      type: "createGame";
      mode:
        | {
            type: "online";
            isPrivate: true;
            opponentUsername: string;
          }
        | {
            type: "online";
            isPrivate: false;
          }
        | {
            type: "local";
            guestName: string;
          };
    }
  | {
      type: "join";
      gameId: GameId;
    }
  | {
      type: "declineInvite";
      gameId: GameId;
    }
  | { type: "listOpenGames" }
  | {
      type: "move";
      to: Position;
      from: Position;
      gameId: GameId;
    };

export type ServerMessage =
  | {
      type: "authenticated";
      userId: string;
      username: string;
    }
  | {
      type: "gameInvite";
      gameId: GameId;
      fromUsername: string;
    }
  | {
      type: "inviteDeclined";
      gameId: GameId;
      byUsername: string;
    }
  | {
      type: "openGames";
      games: {
        gameId: GameId;
        hostUsername: string;
        createdAt: string;
      }[];
    }
  | {
      type: "gameState";
      pieces: CheckerPiece[];
      playerTurn: CheckerColor;
      playerColor: CheckerColor | "both";
      status: GameStatus;
      gameId: GameId;
      mode: "online" | "local";
      players: { red: Player; black: Player | null };
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
    }
  | {
      type: "error";
      requestType: ClientMessage["type"];
      reason: string;
      gameId?: GameId;
    };
