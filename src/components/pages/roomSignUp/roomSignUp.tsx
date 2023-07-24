import JoinRoom from './subcomponents/joinRoom/joinRoom';
import NewRoomForm from './subcomponents/roomForm/roomForm';
import HorizontalDivider from '@/components/ui/horizontalDivider/horizontalDivider';
import GoBackArrow from '@/components/ui/goBackArrow/goBackArrow';

import styles from './roomSignUp.module.css';

const RoomSignUp = () => {
  return (
    <>
      <main className={styles.wrapper}>
        <GoBackArrow black />
        <NewRoomForm />
        <HorizontalDivider />
        <JoinRoom />
      </main>
    </>
  );
};

export default RoomSignUp;
