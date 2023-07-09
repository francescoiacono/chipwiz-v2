'use client';
import { useRoom } from '@/components/providers';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';

const Page = () => {
  const { slug } = useParams();

  //const { room, listenRoom } = useRoom();

  // useEffect(() => {
  //   const unsubscribe = listenRoom('asd');
  //   return () => {
  //     if (unsubscribe) {
  //       unsubscribe();
  //     }
  //   };
  // }, [listenRoom]);

  return (
    <div>
      <h1>Room</h1>
    </div>
  );
};

export default Page;
