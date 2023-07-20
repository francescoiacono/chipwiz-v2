import HorizontalPanel from '@/components/ui/horizontalPanel/horizontalPanel';
import styles from './roomSettings.module.css';
import { useRoom } from '@/components/providers';

const RoomSettings = () => {
  const { room } = useRoom();

  if (!room) return null;

  const { smallBlind, bigBlind, stage } = room;
  return (
    <HorizontalPanel title='Room Settings'>
      <section className={styles.wrapper}>
        <p>
          Blinds: {smallBlind} / {bigBlind}
        </p>
        <p>Stage: {stage}</p>
      </section>
    </HorizontalPanel>
  );
};

export default RoomSettings;
