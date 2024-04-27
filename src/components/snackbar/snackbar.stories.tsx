import type { Meta, StoryObj } from '@storybook/react';

import { Snackbar } from './snackbar';

const meta: Meta<typeof Snackbar> = {
  component: Snackbar,
  title: 'Snackbar',
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: 'Hello World',
  },
};
