import type { Meta, StoryObj } from '@storybook/react';

import { Modal } from './modal';

const meta: Meta<typeof Modal> = {
  component: Modal,
  title: 'Modal',
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Hello World',
    show: true,
  },
};

export const Wide: Story = {
  args: {
    ...Default.args,
    wide: true,
  },
};
