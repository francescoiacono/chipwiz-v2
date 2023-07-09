'use client';

import { useRouter } from 'next/navigation';

const RoomForm = () => {
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const res = await fetch('/api/room', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: event.currentTarget.roomName.value || 'Untitled Room',
        }),
      });

      const { newRoom } = await res.json();

      if (newRoom) {
        router.push(`/room/${newRoom.id}`);
      }
    } catch (error) {
      console.error("There's been an error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='name'>Choose a Room Name</label>
        <input type='text' name='roomName' />
      </div>

      <div>
        <label htmlFor='password'>Choose a username</label>
        <input type='text' id='username' />
      </div>

      <button type='submit'>Create Room</button>
    </form>
  );
};

export default RoomForm;
