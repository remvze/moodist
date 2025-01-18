import { IoMdPlayCircle } from 'react-icons/io/index';

import { Item } from '../item';

export function MediaControls({
  active,
  onClick,
}: {
  active: boolean;
  onClick: () => void;
}) {
  return (
    <Item
      active={active}
      icon={<IoMdPlayCircle />}
      label="Media Controls"
      onClick={onClick}
    />
  );
}
