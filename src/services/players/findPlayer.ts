export const findPlayer = async (playerId: string) => {
  try {
    const res = await fetch(`/api/player/${playerId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { data } = await res.json();

    if (data) return data;
    else throw new Error('Could not find room');
  } catch (error) {
    console.error("There's been an error:", error);
  }
};
