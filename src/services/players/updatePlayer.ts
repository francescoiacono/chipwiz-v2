import { Player } from '@/data/types';

export const updatePlayer = async (
  playerId: string,
  updatedProperty: Partial<Player>
) => {
  try {
    const res = await fetch(`/api/player/${playerId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...updatedProperty }),
    });

    const { updatedPlayer } = await res.json();

    if (updatedPlayer) return updatedPlayer;
    else throw new Error('Could not update room');
  } catch (error) {
    console.error("There's been an error:", error);
  }
};
