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

export default function ContestTimer ({ startTime, endTime }: Props) {
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

      return(
        <div>
            <h1>Left Time</h1>
        </div>
      )
}
