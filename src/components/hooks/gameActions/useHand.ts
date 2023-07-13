import { Player, Room, Stage } from '@/data/types';
import {
  allPlayersActed,
  getBustedPlayers,
  getDealerNextTurn,
  updateStage,
} from '@/utils';
import { updateRoom } from '@/services';
import { useCallback, useState } from 'react';
import { getPlayersInGame } from '@/utils/getPlayersInGame';

export const useHand = () => {
  const [handWinner, setHandWinner] = useState<Player | null>(null);

  // Function that update game stage
  const updateHand = useCallback(async (room: Room) => {
    let updatedRoom = { ...room };
    const { players } = updatedRoom;
    const playingPlayers = getPlayersInGame(players);

    // 0. Check how many players are in game
    if (playingPlayers.length === 1) {
      console.log('[ONLY ONE PLAYER LEFT]:', players);
      // Update room status
      updatedRoom.stage = Stage.SHOWDOWN;
      updatedRoom.winner = playingPlayers[0];
      // Update winner status
      updatedRoom.players = players.map((player) => {
        if (player.id === playingPlayers[0].id) {
          return {
            ...player,
            chips: player.chips + updatedRoom.pot,
          };
        } else {
          return player;
        }
      });
      setHandWinner(playingPlayers[0]);

      await updateRoom(updatedRoom.id, updatedRoom);
      return;
    }

    // 1. If all players have acted, update the stage
    if (allPlayersActed(players)) {
      // console.log('[ALL PLAYERS HAVE ACTED]');
      updatedRoom.stage = updateStage(updatedRoom.stage);
      updatedRoom.roundStart = updatedRoom.currentTurn;
      updatedRoom.highestBet = 0;

      // 2. Check if any player is all-in
      const allInPlayers = players.filter((player) => player.isAllIn);
      if (allInPlayers.length > 0) {
        console.log('[ALL-IN PLAYERS]:', allInPlayers);
        // 2a. Calculate side pots
        // const sidePots = calculateSidePots(players);
        // console.log('[SIDE POTS]:', sidePots);
      }

      // Reset all players' current bets
      updatedRoom.players = players.map((player) => ({
        ...player,
        hasActed: false,
      }));

      // 4. Update room in db
      await updateRoom(updatedRoom.id, updatedRoom);
    }
  }, []);

  const startHand = useCallback(async (room: Room) => {
    const updatedRoom = { ...room };
    const { players } = updatedRoom;

    // 0. If only one player is not busted, end the game
    if (getBustedPlayers(players).length === players.length - 1) {
      updatedRoom.isStarted = false;
      updatedRoom.isFinished = true;

      await updateRoom(updatedRoom.id, updatedRoom);
      return;
    }

    // 1. Change room status to started
    updatedRoom.isStarted = true;

    // 2 Set room current round to pre-flop
    updatedRoom.stage = Stage.PREFLOP;

    // 3. Find next player index that will have to act
    let nextTurn = players.findIndex((player) => player.isDealer);
    nextTurn = nextTurn < 0 ? 0 : getDealerNextTurn(players);

    // 4. Reset all players
    players.forEach((player) => {
      player.roundBet = 0;
      player.isDealer = player.isSmallBlind = player.isBigBlind = false;
      player.isFolded = false;
      player.isAllIn = false;
      player.hasActed = false;
    });

    // 5. Update players
    //  5a. Assign roles to players (blinds, dealer)
    //  5b. Subtract blinds from their chips
    //  5c. Update player current bet
    if (players.length === 2) {
      const dealerIndex = nextTurn; // When 2 players, dealer is SB
      const bigBlindIndex = (nextTurn + 1) % players.length;

      players[dealerIndex].isDealer = true;
      players[dealerIndex].isSmallBlind = true;
      players[dealerIndex].chips -= updatedRoom.smallBlind;
      players[dealerIndex].roundBet = updatedRoom.smallBlind;
      players[bigBlindIndex].isBigBlind = true;
      players[bigBlindIndex].chips -= updatedRoom.bigBlind;
      players[bigBlindIndex].roundBet = updatedRoom.bigBlind;

      // Track initial round start position
      updatedRoom.roundStart = dealerIndex;
    } else {
      let dealerIndex = nextTurn;
      let smallBlindIndex = (nextTurn + 1) % players.length;
      let bigBlindIndex = (nextTurn + 2) % players.length;

      players[dealerIndex].isDealer = true;
      players[smallBlindIndex].isSmallBlind = true;
      players[smallBlindIndex].chips -= updatedRoom.smallBlind;
      players[smallBlindIndex].roundBet = updatedRoom.smallBlind;
      players[bigBlindIndex].isBigBlind = true;
      players[bigBlindIndex].chips -= updatedRoom.bigBlind;
      players[bigBlindIndex].roundBet = updatedRoom.bigBlind;

      // Track initial round start position
      updatedRoom.roundStart = (nextTurn + 3) % players.length;
    }

    // 6. Add blinds to the pot
    updatedRoom.pot = updatedRoom.smallBlind + updatedRoom.bigBlind;

    // 7. Update room highest bet
    updatedRoom.highestBet = updatedRoom.bigBlind;

    // 8. Update room winner
    updatedRoom.winner = null;

    // 9. Update Room in db
    await updateRoom(updatedRoom.id, updatedRoom);
  }, []);

  return { updateHand, startHand };
};

interface SidePot {
  amount: number;
}

function calculateSidePots(players: Player[]): SidePot[] {
  const sidePots: SidePot[] = [];
  const activePlayers = players.filter(
    (player) => !player.isAllIn && !player.isBusted && !player.isFolded
  );

  if (activePlayers.length > 0) {
  }

  return sidePots;
}
