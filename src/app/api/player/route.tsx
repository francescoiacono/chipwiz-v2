import { Player, Role } from '@/data/types';
import { db } from '@/lib/firebase';
import { generateId, generateSessionId } from '@/utils';
import { doc, setDoc } from 'firebase/firestore';
import { NextRequest, NextResponse } from 'next/server';
// API route for creating a new room
export const POST = async (req: NextRequest) => {
  const { username, chips, host } = await req.json();

  if (
    typeof username !== 'string' ||
    typeof chips !== 'number' ||
    typeof host !== 'boolean'
  ) {
    return NextResponse.json(
      {
        message: 'Invalid input data',
      },
      { status: 400 }
    );
  }

  const playerId = generateId();
  const sessionId = generateSessionId();

  const newPlayer: Player = {
    id: playerId,
    name: username,
    chips,
    session: sessionId,
    role: host ? Role.HOST : Role.PLAYER,
    currentBet: 0,
    hasActed: false,
    isWinner: false,
    isBusted: false,
    isFolded: false,
    isAllIn: false,
    isDealer: false,
    isSmallBlind: false,
    isBigBlind: false,
  };

  try {
    await setDoc(doc(db, 'players', playerId), newPlayer);

    const res = NextResponse.json(
      {
        message: `New ${playerId} created`,
        newPlayer,
      },
      { status: 201 }
    );

    res.cookies.set('sessionId', sessionId);

    return res;
  } catch (e) {
    if (e instanceof Error) {
      console.error(e);
      return NextResponse.json(
        {
          message: 'Failed to create new player',
          error: e.message,
        },
        { status: 500 }
      );
    }
    return NextResponse.json(
      {
        message: 'Failed to create new player',
        error: 'An unexpected error occurred.',
      },
      { status: 500 }
    );
  }
};
