export const createPlayer = async (
  username: string,
  chips: number,
  host: boolean
) => {
  try {
    const res = await fetch('/api/player', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username || 'Anonymous Player',
        chips: chips || 1000,
        host: host || false,
      }),
    });

    const { newPlayer } = await res.json();

    if (newPlayer) return newPlayer;
    else throw new Error('Could not create player');
  } catch (error) {
    console.error("There's been an error:", error);
  }
};
