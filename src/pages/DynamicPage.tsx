import React from 'react';
import { useParams } from 'react-router-dom';

const DynamicPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className='max-w-screen-xl mx-auto mt-20'>
      <h1 className="text-white text-2xl font-bold">Recent Reviews on {id}</h1>
    </div>
  );
};

export default DynamicPage;
