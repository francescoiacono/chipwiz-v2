import JoinRoom from './subcomponents/joinRoom/joinRoom';
import NewRoomForm from './subcomponents/roomForm/roomForm';
import HorizontalDivider from '@/components/ui/horizontalDivider/horizontalDivider';
import GoBackArrow from '@/components/ui/goBackArrow/goBackArrow';

import styles from './roomSignUp.module.css';

const RoomSignUp = () => {
  return (
    <>
      <section className={styles.goBackArrow}>
        <GoBackArrow />
      </section>
      <main className={styles.wrapper}>
        <NewRoomForm />
        <HorizontalDivider />
        <JoinRoom />
      </main>
    </>
  );
};

export default RoomSignUp;
