import PlayerActions from './playerActions/playerActions';
import Button from '@/components/ui/button/button';
import styles from './playerInfo.module.css';
import { Player, Role } from '@/data/types';
import { isPlayerTurn } from '@/utils';
import { useRoom } from '@/components/providers';
import { useEffect, useState } from 'react';
import { useHand } from '@/components/hooks/gameActions';
import PlayerStats from './playerStats/playerStats';
import VerticalPanel from '@/components/ui/verticalPanel/verticalPanel';
import RoomWinner from '../roomWinner/roomWinner';

interface PlayerInfoProps {
  player: Player;
}

const PlayerInfo = ({ player }: PlayerInfoProps) => {
  const { room } = useRoom();
  const { startHand } = useHand();

  const [playerTurn, setPlayerTurn] = useState(false);
  const [isPlayerHost, setIsPlayerHost] = useState(false);

  useEffect(() => {
    if (room) {
      setPlayerTurn(isPlayerTurn(player.id, room));
      setIsPlayerHost(player.role === Role.HOST);
    }
  }, [player.totalBet, player.id, player.role, room]);

  return (
    <VerticalPanel title='Player Information'>
      <section className={styles.wrapper}>
        {room && (
          <section className={styles.infoContainer}>
            <h2>{player.name}</h2>
            <PlayerStats room={room} player={player} />

            <div className={styles.actionsWrapper}>
              {room.isStarted && (
                <>
                  {playerTurn ? (
                    <>
                      <h3 className={styles.turnText}>Your turn!</h3>
                      <PlayerActions />
                    </>
                  ) : (
                    <PlayerActions disabled />
                  )}
                </>
              )}
              {isPlayerHost && !room.isStarted && (
                <Button format='secondary' onClick={() => startHand(room)}>
                  New Hand
                </Button>
              )}
            </div>
          </section>
        )}
        <RoomWinner />
      </section>
    </VerticalPanel>
  );
};

export default PlayerInfo;
