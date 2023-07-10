import { Room } from '@/data/types';

export const updateRoom = async (
  roomId: string,
  updatedProperty: Partial<Room>
) => {
  try {
    const res = await fetch(`/api/room/${roomId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...updatedProperty }),
    });

    const { updatedRoom } = await res.json();

    if (updatedRoom) return updatedRoom;
    else throw new Error('Could not update room');
  } catch (error) {
    console.error("There's been an error:", error);
  }
};
