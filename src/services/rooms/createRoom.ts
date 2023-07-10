export const createRoom = async (roomName: string, initialChips: number) => {
  try {
    const res = await fetch('/api/room', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: roomName || 'Untitled Room',
        initialChips: initialChips || 1000,
      }),
    });

    const { newRoom } = await res.json();

    if (newRoom) return newRoom;
    else throw new Error('Could not create room');
  } catch (error) {
    console.error("There's been an error:", error);
  }
};
