import { db } from '@/lib/firebase';
import { doc, getDoc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export const GET = async (
  req: Request,
  { params }: { params: { slug: string } }
) => {
  try {
    const { slug } = params;

    const docRef = doc(db, 'rooms', slug);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return NextResponse.json({
        message: `Got room ${slug}`,
        data: docSnap.data(),
      });
    } else {
      return NextResponse.json({
        message: `No such document!`,
      });
    }
  } catch (e) {
    console.log('SUPER ERROR:', e);
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
