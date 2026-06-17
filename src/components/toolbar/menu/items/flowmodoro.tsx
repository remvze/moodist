import { MdOutlineAvTimer } from "react-icons/md/index";

import { Item } from "../item";

import { useFlowmodoroStore } from "@/stores/flowmodoro";

interface FlowmodoroProps {
  open: () => void;
}

export function Flowmodoro({ open }: FlowmodoroProps) {
  const running = useFlowmodoroStore((state) => state.running);

  return (
    <Item
      active={running}
      icon={<MdOutlineAvTimer />}
      label="Flowmodoro"
      shortcut="Shift + F"
      onClick={open}
    />
  );
}
