export const formatDisplayDate = (date: string, separator: string = ' ') => {
  const localDate = new Date(date).toLocaleString();
  return localDate.split(':', 2).join(':').replace(/,\s/, separator);
};

export const formatFormDate = (dateString?: string) => {
  const currentDate = dateString ? new Date(dateString) : new Date();
  const date = currentDate.toISOString().split('T', 1);
  const time = currentDate.toLocaleTimeString().slice(0, 5);
  return `${date}T${time}`;
};
