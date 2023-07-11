import JoinRoom from './subcomponents/joinRoom/joinRoom';
import NewRoomForm from './subcomponents/roomForm/roomForm';

const Home = () => {
  return (
    <main>
      <h1>Home</h1>
      <NewRoomForm />
      <h1>Or</h1>
      <JoinRoom />
    </main>
  );
};

export default Home;
