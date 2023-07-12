import { Room, Stage } from '@/data/types';
import { getDealerNextTurn, updateStage } from '@/utils';
import { updateRoom } from '@/services';
import { useCallback } from 'react';
import { getPlayersInGame } from '@/utils/getPlayersInGame';

export const useHand = () => {
  const checkHandEnd = useCallback(async (room: Room) => {
    let updatedRoom = { ...room };
    const { players } = updatedRoom;

    if (getPlayersInGame(players).length === 1) {
      updatedRoom.stage = Stage.SHOWDOWN;
      updatedRoom.winner = players[room.currentTurn];

      await updateRoom(updatedRoom.id, updatedRoom)
        .then(() => console.log('Room updated successfully'))
        .catch(() => console.log('Error updating room'));
      return;
    }

    // 1. Check if all players have acted
    const allPlayersActed = players.every(
      (player) => player.hasActed || player.isFolded
    );

    // 2. If all players have acted, update the stage
    if (allPlayersActed) {
      console.log('ALL PLAYERS ACTED');
      updatedRoom.stage = updateStage(updatedRoom.stage);
      updatedRoom.roundStart = updatedRoom.currentTurn;
      updatedRoom.highestBet = 0;

      // 3. Reset all players' current bets
      updatedRoom.players = players.map((player) => ({
        ...player,
        currentBet: 0,
        hasActed: false,
      }));

      // 4. Update room in db
      await updateRoom(updatedRoom.id, updatedRoom)
        .then(() => console.log('Room updated successfully'))
        .catch(() => console.log('Error updating room'));
    }
  }, []);

  const startHand = useCallback(async (room: Room) => {
    const updatedRoom = { ...room };
    const { players } = updatedRoom;

    // 1. Change room status to started
    updatedRoom.isStarted = true;

    // 2 Set room current round to pre-flop
    updatedRoom.stage = Stage.PREFLOP;

    // 3. Find next player index that will have to act
    let nextTurn = players.findIndex((player) => player.isDealer);
    nextTurn = nextTurn < 0 ? 0 : getDealerNextTurn(players);

    // 3a. Keep track of initial turn position
    updatedRoom.roundStart = nextTurn;

    // 4. Reset all players
    players.forEach((player) => {
      player.currentBet = 0;
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
      players[dealerIndex].currentBet = updatedRoom.smallBlind;
      players[bigBlindIndex].isBigBlind = true;
      players[bigBlindIndex].chips -= updatedRoom.bigBlind;
      players[bigBlindIndex].currentBet = updatedRoom.bigBlind;
    } else {
      let dealerIndex = nextTurn;
      let smallBlindIndex = (nextTurn + 1) % players.length;
      let bigBlindIndex = (nextTurn + 2) % players.length;

      players[dealerIndex].isDealer = true;
      players[smallBlindIndex].isSmallBlind = true;
      players[smallBlindIndex].chips -= updatedRoom.smallBlind;
      players[smallBlindIndex].currentBet = updatedRoom.smallBlind;
      players[bigBlindIndex].isBigBlind = true;
      players[bigBlindIndex].chips -= updatedRoom.bigBlind;
      players[bigBlindIndex].currentBet = updatedRoom.bigBlind;
    }

    // 6. Add blinds to the pot
    updatedRoom.pot = updatedRoom.smallBlind + updatedRoom.bigBlind;

    // 7. Update room highest bet
    updatedRoom.highestBet = updatedRoom.bigBlind;

    // 8. Update room winner
    updatedRoom.winner = null;

    // 9. Update Room in db
    await updateRoom(updatedRoom.id, updatedRoom)
      .then(() => console.log('Room updated successfully'))
      .catch(() => console.log('Error updating room'));
  }, []);

  return { checkHandEnd, startHand };
};
