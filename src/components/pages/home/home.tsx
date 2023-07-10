import JoinRoom from './subcomponents/joinRoom/joinRoom';
import RoomForm from './subcomponents/roomForm/roomForm';

const Home = () => {
  return (
    <main>
      <h1>Home</h1>
      <RoomForm />
      <h1>Or</h1>
      <JoinRoom />
    </main>
  );
};

export default Home;
