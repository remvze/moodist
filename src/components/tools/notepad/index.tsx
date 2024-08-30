import { StoreConsumer } from '@/components/store-consumer';

import { Notepad as NotepadComponent } from './notepad';

export function Notepad() {
  return (
    <StoreConsumer>
      <NotepadComponent />
    </StoreConsumer>
  );
}
