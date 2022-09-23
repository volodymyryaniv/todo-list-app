export const formatDisplayDate = (date: string, separator: string = ' ') => {
  console.log('formatDisplayDate input', date); //for testing
  const localDate = new Date(date).toLocaleString('ua', {
    dateStyle: 'short',
    timeStyle: 'short',
  });
  return localDate.replace(/(-|\/)/g, '.').replace(/,\s/, separator);
};

export const formatFormDate = (dateString?: string) => {
  console.log('formatFormDate input', dateString); //for testing
  const currentDate = dateString ? new Date(dateString) : new Date();
  const date = currentDate
    .toISOString()
    .replace(/(\.|\/)/g, '-')
    .split('T', 1);
  const time = currentDate.toLocaleTimeString('ua', { timeStyle: 'short' });
  return `${date}T${time}`;
};
