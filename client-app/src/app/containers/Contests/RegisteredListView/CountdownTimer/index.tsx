import React, { useState, useEffect } from "react";
import { COLOR_CODE, Typo } from "../../../../shared";

interface TimeLeft {
  years?: number;
  months?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

interface Props {
  startTime: string;
  endTime: string;
}

const CountdownTimer: React.FC<Props> = ({ startTime, endTime }) => {
  const calculateTimeLeft = (start: Date, end: Date) => {
    const now = new Date();

    start.setHours(start.getHours() - 7);
    end.setHours(end.getHours() - 7);

    let timeLeft: TimeLeft = {};
    if (now < start) {
      const difference = start.getTime() - now.getTime();
      timeLeft = {
        years: Math.floor(difference / (1000 * 60 * 60 * 24 * 365)),
        months: Math.floor(
          (difference % (1000 * 60 * 60 * 24 * 365)) /
            (1000 * 60 * 60 * 24 * 30)
        ),
        days: Math.floor(
          (difference % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)
        ),
        hours: Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    } else if (now > end) {
      timeLeft = {};
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(
    calculateTimeLeft(new Date(startTime), new Date(endTime))
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(new Date(startTime), new Date(endTime)));
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div>
      {Object.values(timeLeft).some(
        (value) => value !== undefined && value !== 0
      ) ? (
        <div>
          Starts after{" "}
          {timeLeft.years !== 0 && (
            <span>
              {timeLeft.years} Year{timeLeft.years === 1 ? "" : "s"},{" "}
            </span>
          )}
          {(timeLeft.months !== 0 || timeLeft.years !== 0) && (
            <span>
              {timeLeft.months} Month{timeLeft.months === 1 ? "" : "s"},{" "}
            </span>
          )}
          {(timeLeft.days !== 0 ||
            timeLeft.months !== 0 ||
            timeLeft.years !== 0) && (
            <span>
              {timeLeft.days} Day{timeLeft.days === 1 ? "" : "s"},{" "}
            </span>
          )}
          {(timeLeft.hours !== 0 ||
            timeLeft.days !== 0 ||
            timeLeft.months !== 0 ||
            timeLeft.years !== 0) && (
            <span>
              {timeLeft.hours} Hour{timeLeft.hours === 1 ? "" : "s"},{" "}
            </span>
          )}
          {(timeLeft.minutes !== 0 ||
            timeLeft.hours !== 0 ||
            timeLeft.days !== 0 ||
            timeLeft.months !== 0 ||
            timeLeft.years !== 0) && (
            <span>
              {timeLeft.minutes} Minute{timeLeft.minutes === 1 ? "" : "s"},{" "}
            </span>
          )}
          {(timeLeft.seconds !== 0 ||
            timeLeft.minutes !== 0 ||
            timeLeft.hours !== 0 ||
            timeLeft.days !== 0 ||
            timeLeft.months !== 0 ||
            timeLeft.years !== 0) && (
            <span>
              {timeLeft.seconds} Second{timeLeft.seconds === 1 ? "" : "s"}
            </span>
          )}
        </div>
      ) : (
        <Typo color={COLOR_CODE.DANGER}>
          {new Date() < new Date(endTime) ? "Started" : "Ended"}
        </Typo>
      )}
    </div>
  );
};

export default CountdownTimer;
