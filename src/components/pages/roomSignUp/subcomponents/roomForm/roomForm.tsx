'use client';

import Button from '@/components/ui/button/button';
import FormInput from '@/components/ui/formInput/formInput';
import { createPlayer, createRoom, updateRoom } from '@/services';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const NewRoomForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    roomName: '',
    username: '',
    chips: 1000,
    blinds: [20, 40],
  });

  const [loading, setLoading] = useState(false);
  const [e, setError] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'blinds') {
      const blindValue = Number(value);
      setFormData({
        ...formData,
        blinds: [blindValue, blindValue * 2],
      });
    } else {
      setFormData({
        ...formData,
        [name]: name === 'chips' ? Number(value) : value,
      });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const newRoom = await createRoom(
        formData.roomName,
        formData.chips,
        formData.blinds
      );

      if (formData.chips < formData.blinds[1]) {
        throw new Error('Starting chips must be greater than the big blind');
      }

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
          throw new Error(
            'Failed to update room with new player' as Error['message']
          );

        router.push(`/room/${newRoom.id}`);
      }
    } catch (e) {
      let message = 'Unknown Error';
      if (e instanceof Error) message = e.message;
      setError(message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create a room</h1>
      <FormInput
        handleChange={handleChange}
        name='roomName'
        value={formData.roomName}
        placeholder='My amazing room'
      >
        Room Name
      </FormInput>

      <FormInput
        handleChange={handleChange}
        name='username'
        value={formData.username}
        placeholder='Choose a display name'
      >
        Display Name
      </FormInput>

      <FormInput
        handleChange={handleChange}
        name='chips'
        value={formData.chips}
        type='number'
      >
        Starting chips
      </FormInput>

      <FormInput
        handleChange={handleChange}
        name='blinds'
        value={formData.blinds[0]}
        type='number'
      >
        Small Blind
      </FormInput>

      {e && <div>{e}</div>}

      <Button loading={loading} format='primary' type='submit'>
        Create Room
      </Button>
    </form>
  );
};

export default NewRoomForm;
