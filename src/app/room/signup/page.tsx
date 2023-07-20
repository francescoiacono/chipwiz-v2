import RoomSignUp from '@/components/pages/roomSignUp/roomSignUp';
import { RoomProvider } from '@/components/providers';

export default function Page() {
  return (
    <RoomProvider>
      <RoomSignUp />
    </RoomProvider>
  );
}
