import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { Player, Room, Stage } from '@/data/types';

// API route for getting all rooms
export const GET = async () => {
  try {
    const query = await getDocs(collection(db, 'rooms'));

    const roomsData = query.docs.map((room) => {
      return {
        id: room.id,
        ...room.data(),
      };
    });

    return NextResponse.json({ roomsData });
  } catch (e) {
    return NextResponse.json({ error: e });
  }
};

// API route for creating a new room
export const POST = async (req: Request) => {
  const body = await req.json();

  const generateId = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < 6; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));

      if (i === 2) {
        id += '-';
      }
    }
    return id;
  };

  const roomId = generateId();

  const newRoom: Room = {
    name: body.name,
    id: roomId,
    players: [] as Player[],
    game: {
      stage: Stage.PREFLOP,
      currentPlayerTurn: '',
    },
    isStarted: false,
    isFinished: false,
  };

  try {
    const res = await setDoc(doc(db, 'rooms', roomId), newRoom);
    return NextResponse.json({
      message: `Room ${roomId} created`,
      newRoom,
    });
  } catch (e) {
    return NextResponse.json({ error: e });
  }
};
