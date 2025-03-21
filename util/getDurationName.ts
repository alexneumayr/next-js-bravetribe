import { DateTime, Interval } from 'luxon';

export function getDurationName(end: Date, start: Date) {
  const convertedStart = DateTime.fromJSDate(start);
  const convertedEnd = DateTime.fromJSDate(end);
  const i = Interval.fromDateTimes(convertedEnd, convertedStart);
  const seconds = Math.floor(i.length('seconds'));
  const minutes = Math.floor(i.length('minutes'));
  const hours = Math.floor(i.length('hours'));
  const days = Math.floor(i.length('days'));
  const weeks = Math.floor(i.length('weeks'));
  const months = Math.floor(i.length('months'));
  const years = Math.floor(i.length('years'));

  // Check if the duration is less then 60 seconds
  if (seconds < 60) {
    return seconds === 1 ? `1 second` : `${seconds} seconds`;
  }
  // Check if the duration is less then 60 minutes
  else if (minutes < 60) {
    return minutes === 1 ? `1 minute` : `${minutes} minutes`;
  }
  // Check if the duration is less then 24 hours
  else if (hours < 24) {
    return hours === 1 ? `1 hour` : `${hours} hours`;
  }
  // Check if the duration is less then 7 days
  else if (days < 7) {
    return days === 1 ? `1 day` : `${days} days`;
  }
  // Check if the duration is less then 4 weeks
  else if (weeks < 4) {
    return weeks === 1 ? `1 week` : `${weeks} weeks`;
  }
  // Check if the duration is less then 12 months
  else if (months < 12) {
    return months === 1 ? `1 month` : `${months} months`;
  }
  // Otherwise display the duration in years
  else {
    return years === 1 ? `1 year` : `${years} years`;
  }
}
