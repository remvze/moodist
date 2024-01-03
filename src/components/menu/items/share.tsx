import { IoShareSocialSharp } from 'react-icons/io5/index';

import { Item } from '../item';

interface ShareProps {
  open: () => void;
}

export function Share({ open }: ShareProps) {
  return (
    <Item icon={<IoShareSocialSharp />} label="Share Sounds" onClick={open} />
  );
}
