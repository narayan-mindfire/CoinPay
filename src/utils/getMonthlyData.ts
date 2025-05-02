export const getMonthlyData = (
  transactions: any,
  currentUserUID: string,
  t_type: "income" | "spending",
  month: string // Month as a string, e.g., "April"
) => {
  // Month name to number mapping
  const monthNames: { [key: string]: number } = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11
  };

  // Convert the passed month string to the corresponding month number
  const monthNumber = monthNames[month];

  // If the month is invalid (not found), return empty data
  if (monthNumber === undefined) {
    console.error("Invalid month name provided.");
    return { periods: [0, 0, 0, 0, 0], total: 0 };
  }

  const now = new Date();
  const year = now.getFullYear();

  // Define start and end of the month based on the passed month string
  const startOfMonth = new Date(year, monthNumber, 1);
  const endOfMonth = new Date(year, monthNumber + 1, 0, 23, 59, 59, 999); // Last millisecond of the month

  // Filter only transactions for the given month sent by current user
  const monthlyTransactions = transactions.filter((tx) => {
    const txDate = new Date(tx.createdAt.seconds * 1000);

    return (
      (t_type === "income"
        ? tx.receiverUID === currentUserUID
        : tx.senderUID === currentUserUID) &&
      txDate >= startOfMonth &&
      txDate <= endOfMonth
    );
  });

  const periods = [0, 0, 0, 0, 0];
  const daysInMonth = endOfMonth.getDate();
  const periodLength = Math.ceil(daysInMonth / 5);

  monthlyTransactions.forEach((tx) => {
    const txDate = new Date(tx.createdAt.seconds * 1000);
    const day = txDate.getDate();

    const periodIndex = Math.min(Math.floor((day - 1) / periodLength), 4);
    periods[periodIndex] += tx.amount;
  });

  const total = periods.reduce((acc, it) => acc + it, 0);

  return { periods, total };
};
