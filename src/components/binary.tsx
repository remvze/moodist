import { useState, useEffect } from 'react';

import { generateRandomBinaryString } from '@/helpers/binary';

export function Binary() {
  const [binary, setBinary] = useState('');

  useEffect(() => {
    setBinary(generateRandomBinaryString(1000));

    setInterval(() => {
      setBinary(generateRandomBinaryString(1000));
    }, 200);
  }, []);

  return <span>{binary}</span>;
}
