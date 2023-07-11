import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export const GET = async (
  req: Request,
  { params }: { params: { slug: string } }
) => {
  try {
    const { slug } = params;

    const docRef = doc(db, 'players', slug);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return NextResponse.json({
        message: `Got player ${slug}`,
        data: docSnap.data(),
      });
    } else {
      return NextResponse.json({
        message: `No such player!`,
      });
    }
  } catch (e) {
    console.log('ERROR:', e);
  }
};

export const PATCH = async (
  req: Request,
  { params }: { params: { slug: string } }
) => {
  try {
    const body = await req.json();
    const { slug } = params;

    const playerRef = doc(db, 'players', slug);
    await updateDoc(playerRef, { ...body });

    // Get the updated document
    const updatedPlayerSnapshot = await getDoc(playerRef);
    const updatedPlayer = updatedPlayerSnapshot.data();

    return NextResponse.json({
      message: `Player ${slug} updated`,
      updatedPlayer: updatedPlayer,
    });
  } catch (e) {
    return NextResponse.json({ error: e });
  }
};
