import { useRoom } from '@/components/providers';
import { Pot } from '@/data/types';

const RoomStats = () => {
  const { room } = useRoom();

  if (!room) return null;

  const { pots, smallBlind, bigBlind, stage, players, currentTurn } = room;

  return (
    <>
      {pots.length <= 1 ? (
        <p>Pot: {pots[0].amount}</p>
      ) : (
        pots.map((p: Pot, i: number) => <p key={i}>Pot: {p.amount}</p>)
      )}
      <p>
        Blinds: {smallBlind} / {bigBlind}
      </p>
      <p>Stage: {stage}</p>
      <p>
        Player{`'`}s Turn: {players[currentTurn].name}
      </p>
    </>
  );
};

export default RoomStats;
