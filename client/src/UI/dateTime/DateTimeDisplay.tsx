import React, { useEffect, useState } from 'react';


interface IDateTimeDisplayProps {
}

const DateTimeDisplay: React.FunctionComponent<IDateTimeDisplayProps> = () => {


  const [currentDateTime, setCurrentDateTime] = useState<Date>(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };


  return (
    <>
      {formatDate(currentDateTime)} {formatTime(currentDateTime)}
    </>
  );
}
export default DateTimeDisplay;