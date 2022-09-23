export const formatDisplayDate = (date: string, separator: string = ' ') => {
  const localDate = new Date(date).toLocaleString('pl-PL', {
    dateStyle: 'short',
    timeStyle: 'short',
  });
  return localDate.replace(/(-|\/)/g, '.').replace(/,\s/, separator);
};

export const formatFormDate = (dateString?: string) => {
  const currentDate = dateString ? new Date(dateString) : new Date();
  const date = currentDate
    .toISOString()
    .replace(/(\.|\/)/g, '-')
    .split('T', 1);
  const time = currentDate.toLocaleTimeString('pl-PL', { timeStyle: 'short' });
  return `${date}T${time}`;
};
