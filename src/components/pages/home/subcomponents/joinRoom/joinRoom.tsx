'use client';

import Button from '@/components/ui/button/button';
import { useState } from 'react';
import { createPlayer, findRoom, updateRoom } from '@/services';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/ui/spinner/spinner';

const JoinRoom = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    roomId: '',
    username: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const room = await findRoom(formData.roomId);
      if (!room) throw new Error('Room not found');

      const newPlayer = await createPlayer(
        formData.username,
        room.initialChips,
        false
      );

      if (!newPlayer) throw new Error('Failed to create player');

      const updatedRoom = await updateRoom(room.id, {
        players: [...room.players, newPlayer],
      });

      if (!updatedRoom) throw new Error('Failed to update room');

      router.push(`/room/${room.id}`);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Something went wrong');
      }
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='roomName'>Room Code</label>
        <input type='text' name='roomId' onChange={handleChange} />
      </div>

      <div>
        <label htmlFor='username'>Username</label>
        <input type='text' name='username' onChange={handleChange} />
      </div>

      {error && <div>Error: {error}</div>}

      {loading ? <Spinner /> : <Button type='submit'>Join Room</Button>}
    </form>
  );
};

export default JoinRoom;
