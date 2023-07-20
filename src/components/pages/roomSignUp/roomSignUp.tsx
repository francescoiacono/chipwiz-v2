import JoinRoom from './subcomponents/joinRoom/joinRoom';
import NewRoomForm from './subcomponents/roomForm/roomForm';
import styles from './roomSignUp.module.css';
import HorizontalDivider from '@/components/ui/horizontalDivider/horizontalDivider';
import GoBackArrow from '@/components/ui/goBackArrow/goBackArrow';

const RoomSignUp = () => {
  return (
    <>
      <div className={styles.goBackArrow}>
        <GoBackArrow />
      </div>
      <main className={styles.wrapper}>
        <NewRoomForm />
        <HorizontalDivider />
        <JoinRoom />
      </main>
    </>
  );
};

export default RoomSignUp;
