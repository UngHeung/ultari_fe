export function getDate(dateData: string, type?: 'y-m-d' | 'y-m-d h:m:s') {
  if (!dateData) return;

  const [date, time] = dateData.toString().split('T');
  const [year, month, day] = date.split('-');
  const [hour, minute, second] = time.split(':');

  if (type === 'y-m-d') {
    return `${year}년${month}월${day}일`;
  }

  return `${year}년${month}월${day}일 ${hour}시${minute}분${Math.round(+second.slice(0, -1))}초`;
}

export default getDate;
