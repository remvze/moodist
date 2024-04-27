import type { Meta, StoryObj } from '@storybook/react';

import { SpecialButton } from './special-button';

const meta: Meta<typeof SpecialButton> = {
  component: SpecialButton,
  tags: ['autodocs'],
  title: 'SpecialButton',
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Hello World',
    href: '#',
  },
};
