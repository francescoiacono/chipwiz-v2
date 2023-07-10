export const createRoom = async (roomName: string) => {
  try {
    const res = await fetch('/api/room', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: roomName || 'Untitled Room',
      }),
    });

    const { newRoom } = await res.json();

    console.log('New room: ', newRoom);

    if (newRoom) return newRoom;
    else throw new Error('Could not create room');
  } catch (error) {
    console.error("There's been an error:", error);
  }
};
