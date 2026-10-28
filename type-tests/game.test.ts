import type { ClientMessage, GameId, ServerMessage } from "../index";

const gameId = "game-1" as GameId;

// ── One shape per kind of game ─────────────────────────────
const local: ClientMessage = {
  type: "createGame",
  mode: { type: "local", guestName: "Sam" },
};

const badLocal: ClientMessage = {
  type: "createGame",
  // @ts-expect-error a local game can't have an opponent username
  mode: { type: "local", guestName: "Sam", opponentUsername: "blake" },
};

const badPublic: ClientMessage = {
  type: "createGame",
  // @ts-expect-error a public game can't have an opponent
  mode: { type: "online", isPrivate: false, opponentUsername: "blake" },
};

const badPrivate: ClientMessage = {
  type: "createGame",
  // @ts-expect-error a private game needs an opponent
  mode: { type: "online", isPrivate: true },
};

// ── Telling messages apart ─────────────────────────────────
const handle = (message: ServerMessage) => {
  switch (message.type) {
    case "moveResult":
      message.capturedIds; // allowed after narrowing
      break;
    case "moveRejected":
      message.reason;
      // @ts-expect-error a rejection has no captured pieces
      message.capturedIds;
      break;
  }
};

// ── No session ID after signing in ─────────────────────────
type MessagesWithSession = Extract<
  ClientMessage,
  { sessionId: unknown }
>["type"];
const onlyAuthenticate: MessagesWithSession = "authenticate";
// @ts-expect-error join must not carry a session ID
const notJoin: MessagesWithSession = "join";

// ── Guests on the snapshot ─────────────────────────────────
const localSnapshot: ServerMessage = {
  type: "gameState",
  gameId,
  pieces: [],
  playerTurn: "red",
  playerColor: "both",
  status: { state: "inProgress" },
  mode: "local",
  players: {
    red: { kind: "user", username: "ravae" },
    black: { kind: "guest", name: "Sam" },
  },
};

// ── Waiting for an opponent ────────────────────────────────
const waitingSnapshot: ServerMessage = {
  type: "gameState",
  gameId,
  pieces: [],
  playerTurn: "red",
  playerColor: "red",
  status: { state: "waiting" },
  mode: "online",
  players: { red: { kind: "user", username: "ravae" }, black: null },
};

export {
  local,
  badLocal,
  badPublic,
  badPrivate,
  handle,
  onlyAuthenticate,
  notJoin,
  localSnapshot,
  waitingSnapshot,
};
