import { MdOutlineAvTimer } from 'react-icons/md/index';

import { Item } from '../item';

export function Pomodoro() {
  return (
    <Item href="/tools/pomodoro" icon={<MdOutlineAvTimer />} label="Pomodoro" />
  );
}
