import { Container } from '@/components/container';
import { Timers } from './timers';
import { Form } from './form';
import { StoreConsumer } from '@/components/store-consumer';

export function Timer() {
  return (
    <Container tight>
      <StoreConsumer>
        <Form />
        <Timers />
      </StoreConsumer>
    </Container>
  );
}
