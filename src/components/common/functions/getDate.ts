export function getDate(dateData: string, type?: 'y-m-d' | 'y-m-d h:m:s') {
  if (!dateData) return;

  const [date, time] = dateData.toString().split('T');

  if (type === 'y-m-d') {
    return date;
  }

  const today = new Date();
  const compareDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

  return `${compareDate.includes(date) ? date + '' : ''}${time.split('.')[0]}`;
}

export default getDate;
