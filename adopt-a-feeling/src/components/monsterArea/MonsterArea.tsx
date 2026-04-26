import React from 'react';
import cs from 'classnames';
import styles from './MonsterArea.module.scss';

interface MonsterAreaProps {
  monster: string;
}

const MonsterArea: React.FC<MonsterAreaProps> = ({ monster }) => {
  return (
    <div className={cs(styles.monsterPen)}>
      {monster ? (
        <img src={monster} alt="Generated Monster. " style={{ maxWidth: '100%', height: 'auto' }} />
      ) : (
        <p>Your monster will appear here after you submit the form!</p>
      )}
    </div>
  );
};

export default MonsterArea;