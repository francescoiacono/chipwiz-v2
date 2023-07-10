import Room from '@/components/pages/room/room';
import { RoomProvider } from '@/components/providers';

const Page = () => {
  return (
    <RoomProvider>
      <Room />
    </RoomProvider>
  );
};

export default Page;
