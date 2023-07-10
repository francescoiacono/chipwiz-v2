import { Player, Role } from '@/data/types';
import { db } from '@/lib/firebase';
import { generateId } from '@/utils';
import { doc, setDoc } from 'firebase/firestore';
import { NextResponse } from 'next/server';
// API route for creating a new room
export const POST = async (req: Request) => {
  const { username, chips, host } = await req.json();

  if (
    typeof username !== 'string' ||
    typeof chips !== 'number' ||
    typeof host !== 'boolean'
  ) {
    return NextResponse.json({
      status: 'error',
      message: 'Invalid input data',
    });
  }

  const playerId = generateId();

  const newPlayer: Player = {
    id: playerId,
    name: username,
    chips,
    role: host ? Role.HOST : Role.PLAYER,
    currentBet: 0,
    isTurn: false,
    isWinner: false,
    isBusted: false,
    isFolded: false,
    isAllIn: false,
    isSmallBlind: false,
    isBigBlind: false,
  };

  try {
    await setDoc(doc(db, 'players', playerId), newPlayer);
    return NextResponse.json({
      status: 'success',
      message: `New ${playerId} created`,
      newPlayer,
    });
  } catch (e) {
    if (e instanceof Error) {
      console.error(e);
      return NextResponse.json({
        status: 'error',
        message: 'Failed to create new player',
        error: e.message,
      });
    }
    return NextResponse.json({
      status: 'error',
      message: 'Failed to create new player',
      error: 'An unexpected error occurred.',
    });
  }
};
