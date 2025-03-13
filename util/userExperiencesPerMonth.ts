import { getExperiencesFromLast12MonthsByUserIdInsecure } from '@/database/experiences';
import { DateTime } from 'luxon';
import { monthNames } from './monthNames';

export async function userExperiencesPerMonth(id: string) {
  const experiences = await getExperiencesFromLast12MonthsByUserIdInsecure(id);

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
        );
        if (januaryItem) {
          januaryItem.experiences++;
        }
        break;
      case 2:
        const februaryItem = chartData.find(
          (item) => item.month === monthNames[1],
        );
        if (februaryItem) {
          februaryItem.experiences++;
        }
        break;
      case 3:
        const marchItem = chartData.find(
          (item) => item.month === monthNames[2],
        );
        if (marchItem) {
          marchItem.experiences++;
        }
        break;
      case 4:
        const aprilItem = chartData.find(
          (item) => item.month === monthNames[3],
        );
        if (aprilItem) {
          aprilItem.experiences++;
        }
        break;
      case 5:
        const mayItem = chartData.find((item) => item.month === monthNames[4]);
        if (mayItem) {
          mayItem.experiences++;
        }
        break;
      case 6:
        const juneItem = chartData.find((item) => item.month === monthNames[5]);
        if (juneItem) {
          juneItem.experiences++;
        }
        break;
      case 7:
        const julyItem = chartData.find((item) => item.month === monthNames[6]);
        if (julyItem) {
          julyItem.experiences++;
        }
        break;
      case 8:
        const augustItem = chartData.find(
          (item) => item.month === monthNames[7],
        );
        if (augustItem) {
          augustItem.experiences++;
        }
        break;
      case 9:
        const septemberItem = chartData.find(
          (item) => item.month === monthNames[8],
        );
        if (septemberItem) {
          septemberItem.experiences++;
        }
        break;
      case 10:
        const octoberItem = chartData.find(
          (item) => item.month === monthNames[9],
        );
        if (octoberItem) {
          octoberItem.experiences++;
        }
        break;
      case 11:
        const novemberItem = chartData.find(
          (item) => item.month === monthNames[10],
        );
        if (novemberItem) {
          novemberItem.experiences++;
        }
        break;
      case 12:
        const decemberItem = chartData.find(
          (item) => item.month === monthNames[11],
        );
        if (decemberItem) {
          decemberItem.experiences++;
        }
        break;
      default:
        console.log('Error checking the months');
        break;
    }
  });
  return chartData.reverse();
}
