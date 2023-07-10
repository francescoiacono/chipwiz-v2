'use client';

import { createPlayer, createRoom, updateRoom } from '@/actions';
import Spinner from '@/components/ui/spinner/spinner';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const RoomForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    roomName: '',
    username: '',
    chips: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]:
        event.target.name === 'chips'
          ? Number(event.target.value)
          : event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const newRoom = await createRoom(formData.roomName);
      const newPlayer = await createPlayer(
        formData.username,
        formData.chips,
        true
      );

      if (newRoom && newPlayer) {
        const updateRoomPlayer = await updateRoom(newRoom.id, {
          players: [newPlayer],
        });
        if (!updateRoomPlayer)
          throw new Error('Failed to update room with new player');
        router.push(`/room/${newRoom.id}`);
      }
    } catch (e) {
      setError(e as string);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='roomName'>Choose a Room Name</label>
        <input
          onChange={handleChange}
          type='text'
          name='roomName'
          placeholder='Room Name'
          value={formData.roomName}
        />
      </div>

      <div>
        <label htmlFor='username'>Choose a username</label>
        <input
          onChange={handleChange}
          type='text'
          name='username'
          placeholder='Username'
          value={formData.username}
        />
      </div>

      <div>
        <label htmlFor='chips'>Choose a starting chip amount</label>
        <input
          onChange={handleChange}
          type='number'
          name='chips'
          value={formData.chips}
        />
      </div>

      {error && <div>Error: {error}</div>}

      {loading ? <Spinner /> : <button type='submit'>Create Room</button>}
    </form>
  );
};

export default RoomForm;
