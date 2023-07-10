import { Room } from '@/data/types';
import { db } from '@/lib/firebase';
import { doc, getDoc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export const GET = async ({ params }: { params: { slug: string } }) => {
  try {
    const { slug } = params;

    const docRef = doc(db, 'rooms', slug);
    const res = await getDoc(docRef);

    return NextResponse.json({
      message: `Got room ${slug}`,
      data: res.data(),
    });
  } catch (e) {
    return NextResponse.json({ error: e });
  }
};

export const PATCH = async (
  req: Request,
  { params }: { params: { slug: string } }
) => {
  try {
    const body = await req.json();
    const { slug } = params;

    const roomRef = doc(db, 'rooms', slug);
    await updateDoc(roomRef, { ...body });

    // Get the updated document
    const updatedRoomSnapshot = await getDoc(roomRef);
    const updatedRoom = updatedRoomSnapshot.data();

    return NextResponse.json({
      message: `Room ${slug} updated`,
      updatedRoom,
    });
  } catch (e) {
    return NextResponse.json({ error: e });
  }
};
