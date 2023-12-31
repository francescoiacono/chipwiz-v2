import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { Player, Room, Stage } from '@/data/types';
import { generateId } from '@/utils';

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
  try {
    const { name, initialChips, blinds } = await req.json();

    if (name.length > 20)
      return NextResponse.json({
        error: 'Room name is too long. Please use under 20 characters.',
      });

    const roomId = generateId();

    const newRoom: Room = {
      name: name,
      id: roomId,
      winner: null,
      initialChips: initialChips,
      players: [] as Player[],
      smallBlind: blinds[0],
      bigBlind: blinds[1],
      pots: [{ amount: 0, possibleWinners: [] }],
      currentPot: 0,
      highestBet: 0,
      currentTurn: 0,
      stage: Stage.PREFLOP,
      roundStart: 0,
      allInPlayers: 0,
      isStarted: false,
    };

    const res = await setDoc(doc(db, 'rooms', roomId), newRoom);
    return NextResponse.json({
      message: `Room ${roomId} created`,
      newRoom,
    });
  } catch (e) {
    return NextResponse.json({ error: e });
  }
};
