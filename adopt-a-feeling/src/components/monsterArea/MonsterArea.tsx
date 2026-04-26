import React from 'react';

interface MonsterAreaProps {
  monster: string;
}

const MonsterArea: React.FC<MonsterAreaProps> = ({ monster }) => {
  return (
    <div id="monster-pen">
      {monster ? (
        <img src={monster} alt="Generated Monster" style={{ maxWidth: '100%', height: 'auto' }} />
      ) : (
        <p>Your monster will appear here after you submit the form!</p>
      )}
    </div>
  );
};

export default MonsterArea;