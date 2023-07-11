import Room from '@/components/pages/room/room';
import { RoomProvider } from '@/components/providers';
import { cookies } from 'next/headers';

const Page = () => {
  const cookieStore = cookies();
  const sessionId = cookieStore.get('sessionId');

  return (
    <RoomProvider>
      <Room sessionId={sessionId?.value} />
    </RoomProvider>
  );
};

export default Page;
