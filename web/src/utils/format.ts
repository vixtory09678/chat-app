import dayjs from 'dayjs';

export function dateToSimpleTime(dateTime: string, inline = false) {
  const date = dayjs(dateTime).format('DD/MM/YY');
  const time = dayjs(dateTime).format('HH:mm');
  return `${date}${inline ? ' ' : '\n'}${time}`;
}

export function toSimpleTime(timestamp: number | string) {
  const time = dayjs(timestamp).format('HH:mm');
  return time.toString();
}

export function isSameDay(dateTime1: string, dateTime2?: string) {
  return dayjs(dateTime1).isSame(dateTime2, 'day');
}

export function isSameMinute(dateTime1: string, dateTime2?: string) {
  return dayjs(dateTime1).isSame(dateTime2, 'minute');
}
