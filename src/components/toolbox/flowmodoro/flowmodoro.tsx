import { useState, useEffect, useRef, useMemo } from "react";
import { FaUndo, FaPlay, FaPause } from "react-icons/fa/index";
import { IoMdSettings } from "react-icons/io/index";

import { Modal } from "@/components/modal";
import { Button } from "../generics/button";
import { Timer } from "./timer";
import { Tabs } from "./tabs";
import { Setting } from "./setting";

import { useLocalStorage } from "@/hooks/use-local-storage";
import { useSoundEffect } from "@/hooks/use-sound-effect";
import { useFlowmodoroStore } from "@/stores/flowmodoro";
import { useSettingsStore } from "@/stores/settings";
import { useCloseListener } from "@/hooks/use-close-listener";

import styles from "./flowmodoro.module.css";

interface FlowmodoroProps {
  onClose: () => void;
  open: () => void;
  show: boolean;
}

export function Flowmodoro({ onClose, open, show }: FlowmodoroProps) {
  const [showSetting, setShowSetting] = useState(false);

  const [selectedTab, setSelectedTab] = useState("flowmodoro");

  const running = useFlowmodoroStore((state) => state.running);
  const setRunning = useFlowmodoroStore((state) => state.setRunning);

  const [timer, setTimer] = useState(0);
  const interval = useRef<ReturnType<typeof setInterval> | null>(null);
  const alarmVolume = useSettingsStore((state) => state.alarmVolume);

  const alarm = useSoundEffect("/sounds/alarm.mp3", alarmVolume);

  const defaultBreakPercentage = useMemo(() => ({ break: 20 }), []);

  const [breakPercentage, setBreakPercentage] = useLocalStorage<
    Record<string, number>
  >("moodist-flowmodoro-setting", defaultBreakPercentage);
  const [breakDuration, setBreakDuration] = useState(0);

  const [completions, setCompletions] = useState<Record<string, number>>({
    flowmodoro: 0,
    break: 0,
  });

  const tabs = useMemo(
    () => [
      { id: "flowmodoro", label: "Flowmodoro" },
      { id: "break", label: "Break" },
    ],
    [],
  );

  useCloseListener(() => setShowSetting(false));

  useEffect(() => {
    if (running && selectedTab == "break") {
      if (interval.current) clearInterval(interval.current);

      interval.current = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (running && selectedTab == "flowmodoro") {
      if (interval.current) clearInterval(interval.current);

      interval.current = setInterval(() => {
        setTimer((up) => up + 1);
      }, 1000);
    } else {
      if (interval.current) clearInterval(interval.current);
    }
  }, [running, selectedTab]);

  useEffect(() => {
    if (selectedTab == "break") {
      if (timer <= 0 && running) {
        if (interval.current) clearInterval(interval.current);

        alarm.play();

        setRunning(false);
        setCompletions((prev) => ({
          ...prev,
          [selectedTab]: (prev[selectedTab] || 0) + 1,
        }));
      }
    }
  }, [timer, selectedTab, running, setRunning, alarm]);

  useEffect(() => {
    const time = selectedTab == "break" ? breakDuration : 0;

    if (interval.current) clearInterval(interval.current);

    setRunning(false);
    setTimer(time);
  }, [selectedTab, breakDuration, setRunning]);

  const toggleRunning = () => {
    if (selectedTab == "break") {
      if (running) setRunning(false);
      else if (timer <= 0) {
        setTimer(breakDuration);
        setRunning(true);
      } else setRunning(true);
    } else {
      if (running) {
        setBreakDuration(Math.round(timer * (breakPercentage.break / 100)));
        setRunning(false);

        setCompletions((prev) => ({
          ...prev,
          [selectedTab]: (prev[selectedTab] || 0) + 1,
        }));
      } else setRunning(true);
    }
  };

  const restart = () => {
    if (interval.current) clearInterval(interval.current);

    const time = 0;
    setBreakDuration(0);

    setRunning(false);
    setTimer(time);
  };

  return (
    <>
      <Modal show={show} onClose={onClose}>
        <header className={styles.header}>
          <h2 className={styles.title}>Flowmodoro Timer</h2>

          <div className={styles.button}>
            <Button
              icon={<IoMdSettings />}
              tooltip="Change Times"
              onClick={() => {
                onClose();
                setShowSetting(true);
              }}
            />
          </div>
        </header>

        <Tabs selectedTab={selectedTab} tabs={tabs} onSelect={setSelectedTab} />
        <Timer timer={timer} />

        <div className={styles.control}>
          <p className={styles.completed}>
            {completions[selectedTab] || 0} completed
          </p>
          <div className={styles.buttons}>
            <Button
              icon={<FaUndo />}
              smallIcon
              tooltip="Restart"
              onClick={restart}
            />
            <Button
              icon={running ? <FaPause /> : <FaPlay />}
              smallIcon
              tooltip={running ? "Pause" : "Start"}
              onClick={toggleRunning}
            />
          </div>
        </div>
      </Modal>

      <Setting
        show={showSetting}
        times={breakPercentage}
        onChange={(value) => {
          setShowSetting(false);
          setBreakPercentage(value);
          open();
        }}
        onClose={() => {
          setShowSetting(false);
          open();
        }}
      />
    </>
  );
}
