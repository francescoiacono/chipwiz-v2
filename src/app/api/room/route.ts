import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
} from 'firebase/firestore';
import { Room } from '@/data/types';

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { name } = body;
    const usersCollection = collection(db, 'rooms');

    const roomData: Room = {
      name: name,
      players: [],
    };

    const res = await addDoc(usersCollection, roomData);

    return NextResponse.json({ res, roomId: res.id });
  } catch (e) {
    return NextResponse.json({ error: e });
  }
};

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
