export const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString();
};

export const capitalizeString = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
