import React from 'react';
import RoomHeader from './roomHeader/roomHeader';
import RoomStats from './roomStats/roomStats';
import RoomWinner from './roomWinner/roomWinner';
import PlayerList from './playerList/playerList';

const RoomInfo = () => {
  return (
    <section>
      <RoomHeader />
      <RoomStats />
      <PlayerList />
      <RoomWinner />
    </section>
  );
};

export default React.memo(RoomInfo);
