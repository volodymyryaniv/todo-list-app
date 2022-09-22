export const formatDisplayDate = (date: string, separator: string = ' ') => {
  return date.split(':', 2).join(':').replace(/,\s/, separator);
};

export const formatFormDate = () => {
  const currentDate = new Date();
  const date = currentDate.toISOString().split('T', 1);
  const time = currentDate.toLocaleTimeString().slice(0, 5);
  return `${date}T${time}`;
};
