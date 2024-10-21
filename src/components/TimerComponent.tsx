import React, { useEffect, useCallback } from 'react';
import { Play, Pause, Square, Trash2 } from 'lucide-react';

interface TimerData {
  id: number;
  time: number;
  isRunning: boolean;
}

interface TimerComponentProps {
  timer: TimerData;
  updateTimer: (id: number, updatedTimer: Partial<TimerData>) => void;
  removeTimer: (id: number) => void;
}

const TimerComponent: React.FC<TimerComponentProps> = ({ timer, updateTimer, removeTimer }) => {
  const formatTime = (time: number): string => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const toggleTimer = useCallback(() => {
    updateTimer(timer.id, { isRunning: !timer.isRunning });
  }, [timer.id, timer.isRunning, updateTimer]);

  const resetTimer = useCallback(() => {
    updateTimer(timer.id, { time: 0, isRunning: false });
  }, [timer.id, updateTimer]);

  useEffect(() => {
    let interval: number | undefined;
    if (timer.isRunning) {
      interval = window.setInterval(() => {
        updateTimer(timer.id, { time: timer.time + 1 });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer.id, timer.isRunning, timer.time, updateTimer]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="text-4xl font-mono mb-4">{formatTime(timer.time)}</div>
      <div className="flex justify-between">
        <button
          onClick={toggleTimer}
          className={`${
            timer.isRunning ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'
          } text-white font-bold py-2 px-4 rounded mr-2`}
        >
          {timer.isRunning ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <button
          onClick={resetTimer}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
        >
          <Square size={20} />
        </button>
        <button
          onClick={() => removeTimer(timer.id)}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default TimerComponent;