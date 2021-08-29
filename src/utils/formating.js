import  {format, isSameDay, isAfter, subDays}  from 'date-fns';
import ru from 'date-fns/locale/ru';

export const numberFormat = (number) => {
  let result = '';
  while (number > 1) {
    result = result ? `${number%1000} ${result}` : number%1000;
    number = Math.floor(number/1000);
  }

  return result
}

const firstLetterToUppercase = (str) => {
  return str.slice(0, 1).toUpperCase() + str.slice(1);
}

export const dateFormat = (dateStr) => {
  const today = new Date();
  const yesterday = subDays(today, 1);
  const aWeekAgo = subDays(today, 7);
  const ordersDate = new Date(dateStr);

  const rtf = new Intl.RelativeTimeFormat('ru', { numeric: 'auto' });
  let timeDistance = '';
  if (isSameDay(ordersDate, today)) {
    timeDistance = firstLetterToUppercase(rtf.format(0, 'day'));
  } else if (isSameDay(ordersDate, yesterday)) {
    timeDistance = firstLetterToUppercase(rtf.format(-1, 'day'));
  } else if (isAfter(ordersDate, aWeekAgo)) {
    const diffInTime = ordersDate.getTime() - today;
    timeDistance = rtf.format(Math.ceil(diffInTime / (1000 * 3600 * 24)), 'day');
    timeDistance = firstLetterToUppercase(timeDistance);
  } else {
    timeDistance = format(ordersDate, 'dd MMMM yyyy', {locale: ru})
  }

  return  timeDistance + ', '
    + format(ordersDate, 'HH:mm O', {locale: ru})
}
