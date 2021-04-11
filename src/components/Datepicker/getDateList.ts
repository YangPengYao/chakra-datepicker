import addDays from 'date-fns/addDays';
import startOfWeek from 'date-fns/startOfWeek';

type GetDateList = (
  year: number,
  month: number
) => {
  day: number;
  month: number;
  year: number;
  isThisMonth: boolean;
}[]

export const getDateList: GetDateList = (year, month) => {
  let dayList = Array.from({ length: 42 }, () => ({
    day: 1,
    year: year,
    month: month,
    isThisMonth: true,
  }))

  // the month of Date's start is 0, so substract 1 from month
  const transferedMonth = month - 1;

  const startDate = startOfWeek(new Date(year, transferedMonth, 1))

  return dayList.map((_, index) => {
    const currentDay = addDays(startDate, index)

    return {
      day: currentDay.getDate(),
      month: currentDay.getMonth(),
      year: currentDay.getFullYear(),
      isThisMonth: currentDay.getMonth() === transferedMonth,
    }
  })
};