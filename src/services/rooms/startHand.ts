export const startHand = async (room: Room) => {
  const updatedRoom = { ...room };
  const { players } = updatedRoom;

  // 1. Change room status to started
  updatedRoom.isStarted = true;

  // 2. Set current turn to the first player
  updatedRoom.currentTurn = 0;

  // 3. Set all players current bet to 0
  players.forEach((player) => {
    player.currentBet = 0;
  });

  // 4. Assign roles to players (blinds, dealer) and subtract blinds from their chips
  if (players.length === 2) {
    players[0].isDealer = true;
    players[0].isSmallBlind = true;
    players[0].chips -= updatedRoom.smallBlind;
    players[1].isBigBlind = true;
    players[1].chips -= updatedRoom.bigBlind;
  } else {
    players[0].isDealer = true;
    players[1].isSmallBlind = true;
    players[1].chips -= updatedRoom.smallBlind;
    players[2].isBigBlind = true;
    players[2].chips -= updatedRoom.bigBlind;
  }
  // 6. Add blinds to the pot
  updatedRoom.pot += updatedRoom.smallBlind + updatedRoom.bigBlind;

  // 7. Update Room in db

  const res = await updateRoom(updatedRoom.id, updatedRoom);
  if (res) {
    console.log('Room updated successfully');
  } else {
    console.log('Error updating room');
  }
};
