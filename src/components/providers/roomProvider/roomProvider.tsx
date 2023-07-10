'use client';

import { Room } from '@/data/types';
import { db } from '@/lib/firebase';
import { Unsubscribe, doc, onSnapshot } from 'firebase/firestore';
import { createContext, useContext, useState } from 'react';

interface RoomContextType {
  room: Room | null;
  setRoom: (room: Room) => void;
  listenRoom: (roomId: string) => Unsubscribe | null;
}

const RoomContext = createContext<RoomContextType>({
  room: null,
  setRoom: () => {},
  listenRoom: () => null,
});

export const RoomProvider = ({ children }: { children: React.ReactNode }) => {
  const [room, setRoom] = useState<Room | null>(null);

  const listenRoom = (roomId: string) => {
    const docRef = doc(db, 'rooms', roomId);

    if (!docRef) return null;
    const unsub = onSnapshot(docRef, (doc) => {
      setRoom(doc.data() as Room);
    });
    return unsub;
  };

  return (
    <RoomContext.Provider value={{ room, setRoom, listenRoom }}>
      {children}
    </RoomContext.Provider>
  );
};

export const useRoom = () => useContext(RoomContext);
