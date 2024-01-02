import { Item } from '../item';

interface ShareProps {
  open: () => void;
}

export function Share({ open }: ShareProps) {
  return <Item onClick={open}>Share Sounds</Item>;
}
