import Home from '@/components/pages/home/home';
import { RoomProvider } from '@/components/providers';

export default function Page() {
  return (
    <RoomProvider>
      <Home />
    </RoomProvider>
  );
}
