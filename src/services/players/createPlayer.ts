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

    const { newPlayer, error } = await res.json();

    if (newPlayer) {
      return newPlayer;
    } else {
      throw new Error(error);
    }
  } catch (error) {
    let message = 'Unknown Error';
    if (error instanceof Error) message = error.message;
    throw new Error(message);
  }
};
