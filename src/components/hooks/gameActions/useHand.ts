import { useCallback } from 'react';
import { usePot } from '.';
import { Player, Room, Stage } from '@/data/types';
import { updateRoom } from '@/services';
import {
  allPlayersActed,
  canPlayersStillBet,
  getBustedPlayers,
  getDealerNextTurn,
  updateStage,
  getActivePlayers,
  getAllInPlayers,
  calculatePotentialWins,
  endHandWithWinner,
} from '@/utils';

export const useHand = () => {
  const { addPot, distributePot } = usePot();

  // Function that update game stage
  const updateHand = useCallback(async (room: Room) => {
    let updatedRoom = { ...room };
    const { players } = updatedRoom;
    const activePlayers = getActivePlayers(players);
    const allInPlayers = getAllInPlayers(activePlayers);

    // Set potential wins
    const potentialWins = calculatePotentialWins(activePlayers);
    players.forEach((p) => {
      if (potentialWins[p.id]) {
        p.potentialWin = potentialWins[p.id];
      }
    });

    // If activePlayers is 1, end the game with the winner
    if (activePlayers.length === 1) {
      updatedRoom = endHandWithWinner(updatedRoom, activePlayers);
      await updateRoom(updatedRoom.id, updatedRoom);
      return;
    }

    // If all players have acted, update game stage
    if (allPlayersActed(players)) {
      // If all players are all-in, end the game
      if (allInPlayers.length === activePlayers.length - 1) {
        updatedRoom.stage = Stage.SHOWDOWN;
        updatedRoom.isStarted = false;

        await updateRoom(updatedRoom.id, updatedRoom);
        return;
      }

      // If not update room status
      updatedRoom.stage = updateStage(updatedRoom.stage);
      updatedRoom.roundStart = updatedRoom.currentTurn;
      updatedRoom.highestBet = 0;

      // When a player goes all-in, a side pot is created
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
      }

      // If all players are all-in, end the game
      else if (allInPlayers.length === activePlayers.length) {
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
    let nextTurn = getDealerNextTurn(players);

    // 4. Reset all players
    players.forEach((player) => {
      player.totalBet = 0;
      player.stageBet = 0;
      player.isDealer = player.isSmallBlind = player.isBigBlind = false;
      player.isFolded = false;
      player.isAllIn = false;
      player.hasActed = false;
      player.initialRoundChips = player.chips;
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
      players[dealerIndex].stageBet = updatedRoom.smallBlind;
      players[bigBlindIndex].isBigBlind = true;
      players[bigBlindIndex].chips -= updatedRoom.bigBlind;
      players[bigBlindIndex].totalBet = updatedRoom.bigBlind;
      players[bigBlindIndex].stageBet = updatedRoom.bigBlind;

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
      players[smallBlindIndex].stageBet = updatedRoom.smallBlind;
      players[bigBlindIndex].isBigBlind = true;
      players[bigBlindIndex].chips -= updatedRoom.bigBlind;
      players[bigBlindIndex].totalBet = updatedRoom.bigBlind;
      players[bigBlindIndex].stageBet = updatedRoom.bigBlind;

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

  // Function that set winner
  const setHandWinner = useCallback(async (room: Room, winner: Player) => {
    const updatedRoom = { ...room };
    const { pots, currentPot, players } = updatedRoom;

    const potentialWinners = players.filter((player) =>
      pots[currentPot].possibleWinners.some(
        (potPlayer) => potPlayer.id === player.id
      )
    );

    // Update winner chips
    const updatedPlayers = distributePot(
      potentialWinners,
      winner.id,
      pots[currentPot].amount
    );

    updatedRoom.players = players.map(
      (player) =>
        updatedPlayers.find(
          (updatedPlayer) => updatedPlayer.id === player.id
        ) || player
    );

    // Update pots
    if (pots.length > 1) {
      updatedRoom.pots.pop();
      updatedRoom.currentPot -= 1;
    } else {
      updatedRoom.winner = winner;
    }

    await updateRoom(updatedRoom.id, updatedRoom);
  }, []);

  return { updateHand, startHand, setHandWinner };
};
