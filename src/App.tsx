import { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const formatTime = (time: number): string => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const toggleTimer = useCallback(() => {
    setIsRunning(!isRunning);
  }, [isRunning]);

  const resetTimer = useCallback(() => {
    setTime(0);
    setIsRunning(false);
  }, []);

  useEffect(() => {
    let interval: number | undefined;
    if (isRunning) {
      interval = window.setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 text-center">
        <h1 className="text-9xl md:text-6xl font-light mb-8 text-gray-800">La Sala del Tiempo</h1>
        <div className="timer-display text-6xl md:text-9xl font-light mb-8 text-gray-900">
          {formatTime(time)}
        </div>
        <div className="flex justify-center space-x-4">
          <button
            onClick={toggleTimer}
            className={`${
              isRunning ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'
            } text-white font-semibold py-3 px-6 rounded-full transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-green-500`}
          >
            {isRunning ? <Pause size={48} /> : <Play size={48} />}
          </button>
          <button
            onClick={resetTimer}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-6 rounded-full transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500"
          >
            <RotateCcw size={48} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;