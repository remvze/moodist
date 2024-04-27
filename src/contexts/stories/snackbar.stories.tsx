import type { Meta, StoryObj } from '@storybook/react';

import { SnackbarProvider, useSnackbar } from '../snackbar';

const meta: Meta<typeof Snackbar> = {
  component: SnackbarProvider,
  title: 'SnackbarProvider',
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <SnackbarProvider>
      <Snackbar />
    </SnackbarProvider>
  ),
};

function Snackbar() {
  const snackbar = useSnackbar();

  return <button onClick={() => snackbar('Hello World')}>Show Snackbar</button>;
}
