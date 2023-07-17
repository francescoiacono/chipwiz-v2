import JoinRoom from './subcomponents/joinRoom/joinRoom';
import NewRoomForm from './subcomponents/roomForm/roomForm';
import styles from './home.module.css';

const Home = () => {
  return (
    <main className={styles.wrapper}>
      <NewRoomForm />
      <JoinRoom />
    </main>
  );
};

export default Home;
