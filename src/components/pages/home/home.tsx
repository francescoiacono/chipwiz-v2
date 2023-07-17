import JoinRoom from './subcomponents/joinRoom/joinRoom';
import NewRoomForm from './subcomponents/roomForm/roomForm';

const Home = () => {
  return (
    <main>
      <NewRoomForm />
      <JoinRoom />
    </main>
  );
};

export default Home;
