import { Player, Room, Stage } from '@/data/types';
import { usePot } from '.';
import {
  allPlayersActed,
  canPlayersStillBet,
  getBustedPlayers,
  getDealerNextTurn,
  updateStage,
} from '@/utils';
import { updateRoom } from '@/services';
import { useCallback } from 'react';
import { getActivePlayers, getAllInPlayers } from '@/utils/getActivePlayers';

export const useHand = () => {
  const { addPot } = usePot();

  // Function that update game stage
  const updateHand = useCallback(async (room: Room) => {
    let updatedRoom = { ...room };
    const { players } = updatedRoom;
    const activePlayers = getActivePlayers(players);
    const allInPlayers = getAllInPlayers(activePlayers);

    // If activePlayers is 1, end the game
    if (activePlayers.length === 1) {
      // Update room status
      updatedRoom.stage = Stage.SHOWDOWN;
      updatedRoom.winner = activePlayers[0];
      updatedRoom.isStarted = false;

      // Update winner status
      updatedRoom.players = players.map((player) => {
        const totalPot = updatedRoom.pots.reduce((acc, pot) => {
          return acc + pot.amount;
        }, 0);

        if (player.id === activePlayers[0].id) {
          return {
            ...player,
            chips: totalPot + player.chips,
          };
        } else {
          return player;
        }
      });

      await updateRoom(updatedRoom.id, updatedRoom);
      return;
    }

    // If all players have acted, update game stage
    if (allPlayersActed(players)) {
      // HEADS UP
      if (allInPlayers.length === activePlayers.length - 1) {
        // Update room status
        updatedRoom.stage = Stage.SHOWDOWN;
        updatedRoom.isStarted = false;

        await updateRoom(updatedRoom.id, updatedRoom);
        return;
      }

      updatedRoom.stage = updateStage(updatedRoom.stage);
      updatedRoom.roundStart = updatedRoom.currentTurn;
      updatedRoom.highestBet = 0;

      // 2. Check if any player is all-in
      if (
        allInPlayers.length > 0 &&
        allInPlayers.length !== updatedRoom.allInPlayers &&
        canPlayersStillBet(players, updatedRoom.highestBet)
      ) {
        const sidePotPossibleWinners = activePlayers.filter(
          (player) => !player.isAllIn
        );

        const newSidePot = addPot(sidePotPossibleWinners);

        updatedRoom.pots.push(newSidePot);
        updatedRoom.currentPot += 1;
        updatedRoom.allInPlayers = allInPlayers.length;
      } else if (allInPlayers.length === activePlayers.length) {
        updatedRoom.pots[updatedRoom.currentPot].possibleWinners =
          activePlayers;

        // Update room status
        updatedRoom.stage = Stage.SHOWDOWN;
        updatedRoom.isStarted = false;
      }

      // Reset all players hasActed status
      updatedRoom.players = players.map((player) => ({
        ...player,
        hasActed: false,
        stageBet: 0,
      }));

      // 4. Update room in db
      await updateRoom(updatedRoom.id, updatedRoom);
      return;
    }
  }, []);

  const startHand = useCallback(async (room: Room) => {
    const updatedRoom = { ...room };
    const { players } = updatedRoom;

    // 0. If only one player is not busted, end the game
    if (getBustedPlayers(players).length === players.length - 1) {
      updatedRoom.isStarted = false;

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
      player.totalBet = 0;
      player.stageBet = 0;
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
      players[dealerIndex].totalBet = updatedRoom.smallBlind;
      players[bigBlindIndex].isBigBlind = true;
      players[bigBlindIndex].chips -= updatedRoom.bigBlind;
      players[bigBlindIndex].totalBet = updatedRoom.bigBlind;

      // Track initial round start position
      updatedRoom.roundStart = dealerIndex;
    } else {
      let dealerIndex = nextTurn;
      let smallBlindIndex = (nextTurn + 1) % players.length;
      let bigBlindIndex = (nextTurn + 2) % players.length;

      players[dealerIndex].isDealer = true;
      players[smallBlindIndex].isSmallBlind = true;
      players[smallBlindIndex].chips -= updatedRoom.smallBlind;
      players[smallBlindIndex].totalBet = updatedRoom.smallBlind;
      players[bigBlindIndex].isBigBlind = true;
      players[bigBlindIndex].chips -= updatedRoom.bigBlind;
      players[bigBlindIndex].totalBet = updatedRoom.bigBlind;

      // Track initial round start position
      updatedRoom.roundStart = (nextTurn + 3) % players.length;
    }

    // 6. Add blinds to the pot
    updatedRoom.pots = [
      {
        amount: updatedRoom.smallBlind + updatedRoom.bigBlind,
        possibleWinners: players,
      },
    ];

    updatedRoom.currentPot = 0;
    updatedRoom.allInPlayers = 0;

    // 7. Update room highest bet
    updatedRoom.highestBet = updatedRoom.bigBlind;

    // 8. Update room winner
    updatedRoom.winner = null;

    // 9. Update Room in db
    await updateRoom(updatedRoom.id, updatedRoom);
  }, []);

  const setHandWinner = useCallback(async (room: Room, winner: Player) => {
    const updatedRoom = { ...room };
    const { players, pots, currentPot } = updatedRoom;

    const updatedPlayers = players.map((p) => {
      if (p.id === winner.id) {
        return {
          ...p,
          chips: p.chips + pots[currentPot].amount,
        };
      }
      return p;
    });

    updatedRoom.players = updatedPlayers;

    if (pots.length > 1) {
      updatedRoom.pots.pop();
      updatedRoom.currentPot -= 1;
    } else {
      updatedRoom.winner = winner;
    }

    await updateRoom(updatedRoom.id, updatedRoom);
    return;
  }, []);

  return { updateHand, startHand, setHandWinner };
};
