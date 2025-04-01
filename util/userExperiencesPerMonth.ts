import { getExperiencesFromLast12MonthsByUserIdInsecure } from '@/database/experiences';
import { DateTime } from 'luxon';
import { monthNames } from './monthNames';

/* Returns an array with the names of the last 12 months and the corresponding number of experience reports from the specified user. */
export async function userExperiencesPerMonth(userId: string) {
  const experiences =
    await getExperiencesFromLast12MonthsByUserIdInsecure(userId);

  const currentMonth = new Date().getMonth();

  const chartData = Array.from({ length: 12 }, (value, index) => {
    return {
      month: monthNames[(currentMonth - index + 12) % 12],
      experiences: 0,
    };
  });

  experiences.forEach((experience) => {
    const date = DateTime.fromISO(experience.date.toISOString());

    switch (date.month) {
      case 1:
        const januaryItem = chartData.find(
          (item) => item.month === monthNames[0],
        )!;
        januaryItem.experiences++;

        break;
      case 2:
        const februaryItem = chartData.find(
          (item) => item.month === monthNames[1],
        )!;
        februaryItem.experiences++;

        break;
      case 3:
        const marchItem = chartData.find(
          (item) => item.month === monthNames[2],
        )!;
        marchItem.experiences++;

        break;
      case 4:
        const aprilItem = chartData.find(
          (item) => item.month === monthNames[3],
        )!;
        aprilItem.experiences++;

        break;
      case 5:
        const mayItem = chartData.find((item) => item.month === monthNames[4])!;
        mayItem.experiences++;

        break;
      case 6:
        const juneItem = chartData.find(
          (item) => item.month === monthNames[5],
        )!;
        juneItem.experiences++;
        break;
      case 7:
        const julyItem = chartData.find(
          (item) => item.month === monthNames[6],
        )!;
        julyItem.experiences++;

        break;
      case 8:
        const augustItem = chartData.find(
          (item) => item.month === monthNames[7],
        )!;
        augustItem.experiences++;

        break;
      case 9:
        const septemberItem = chartData.find(
          (item) => item.month === monthNames[8],
        )!;
        septemberItem.experiences++;

        break;
      case 10:
        const octoberItem = chartData.find(
          (item) => item.month === monthNames[9],
        )!;
        octoberItem.experiences++;

        break;
      case 11:
        const novemberItem = chartData.find(
          (item) => item.month === monthNames[10],
        )!;
        novemberItem.experiences++;

        break;
      case 12:
        const decemberItem = chartData.find(
          (item) => item.month === monthNames[11],
        )!;
        decemberItem.experiences++;

        break;
      default:
        console.log('Error checking the months');
        break;
    }
  });
  return chartData.reverse();
}
