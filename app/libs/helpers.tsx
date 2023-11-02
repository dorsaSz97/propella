export const getTotalDaysNum = (startDate: Date, endDate: Date) => {
  return (endDate.getTime() - startDate.getTime()) / 1000 / 60 / 60 / 24 + 1;
};

export const getDatesArr = (startDate: Date, endDate: Date) => {
  let dates = [];

  while (startDate <= endDate) {
    dates.push(startDate);
    startDate.setDate(startDate.getDate() + 1);
  }

  return dates;
};
