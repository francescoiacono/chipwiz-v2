import styles from './playerStats.module.css';
import { Player, Room } from '@/data/types';
import { useEffect, useState } from 'react';

interface PlayerStatsProps {
  room: Room;
  player: Player;
}

const PlayerStats = ({ room, player }: PlayerStatsProps) => {
  const [difference, setDifference] = useState(0);

  useEffect(() => {
    if (!room.isStarted) setDifference(player.chips - player.initialRoundChips);
    else setDifference(0);
  }, [player.chips, player.initialRoundChips, room.isStarted]);

  return (
    <section className={styles.playerStats}>
      <p>
        Chips: {player.chips}
        <>
          {difference === 0 ? null : difference > 0 ? (
            <span style={{ color: 'green', fontWeight: 700 }}>
              ({`+${player.chips - player.initialRoundChips}`})
            </span>
          ) : (
            difference < 0 && (
              <span style={{ color: 'red', fontWeight: 700 }}>
                ({player.chips - player.initialRoundChips})
              </span>
            )
          )}
        </>
      </p>
      <p>Current bet: {player.totalBet}</p>
      <p>
        To call:
        {room.highestBet > player.chips
          ? player.chips
          : room.highestBet - player.stageBet}
      </p>
    </section>
  );
};

export default PlayerStats;
