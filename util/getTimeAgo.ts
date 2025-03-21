import { DateTime, Interval } from 'luxon';

export function getTimeAgo(date: Date) {
  const now = DateTime.now();
  const convertedDate = DateTime.fromJSDate(date);
  const i = Interval.fromDateTimes(convertedDate, now);
  const seconds = Math.floor(i.length('seconds'));
  const minutes = Math.floor(i.length('minutes'));
  const hours = Math.floor(i.length('hours'));
  const days = Math.floor(i.length('days'));
  const weeks = Math.floor(i.length('weeks'));
  const months = Math.floor(i.length('months'));
  const years = Math.floor(i.length('years'));

  // Check if the duration is 0
  if (seconds === 0) {
    return 'Now';
  }
  // Check if the duration is less then 60 seconds
  else if (seconds < 60) {
    return seconds === 1 ? `1 second ago` : `${seconds} seconds ago`;
  }
  // Check if the duration is less then 60 minutes
  else if (minutes < 60) {
    return minutes === 1 ? `1 minute ago` : `${minutes} minutes ago`;
  }
  // Check if the duration is less then 24 hours
  else if (hours < 24) {
    return hours === 1 ? `1 hour ago` : `${hours} hours ago`;
  }
  // Check if the duration is less then 7 days
  else if (days < 7) {
    return days === 1 ? `1 day ago` : `${days} days ago`;
  }
  // Check if the duration is less then 4 weeks
  else if (weeks < 4) {
    return weeks === 1 ? `1 week ago` : `${weeks} weeks ago`;
  }
  // Check if the duration is less then 12 months
  else if (months < 12) {
    return months === 1 ? `1 month ago` : `${months} months ago`;
  }
  // Otherwise display the duration in years
  else {
    return years === 1 ? `1 year ago` : `${years} years ago`;
  }
}
