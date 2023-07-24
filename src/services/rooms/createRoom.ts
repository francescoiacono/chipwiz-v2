export const createRoom = async (
  roomName: string,
  initialChips: number,
  blinds: number[]
) => {
  try {
    const res = await fetch('/api/room', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: roomName || 'Untitled Room',
        initialChips: initialChips || 1000,
        blinds: blinds || [10, 20],
      }),
    });

    const { newRoom, error } = await res.json();

    if (newRoom) {
      return newRoom;
    } else {
      throw new Error(error);
    }
  } catch (error) {
    let message = 'Unknown Error';
    if (error instanceof Error) message = error.message;
    throw new Error(message);
  }
};
