export const getMonthlyData = (transactions: any, currentUserUID: string, t_type: ("income" | "spending")) => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  
    // Filter only this month's transactions sent by current user
    const monthlyTransactions = transactions.filter((tx) => {
      const txDate = new Date(tx.createdAt.seconds * 1000);

      //if the type is income - calculates only incoming transactions else outgoing transactions
      return (
        t_type === "income" ? tx.receiverUID === currentUserUID : tx.senderUID === currentUserUID &&
        txDate >= startOfMonth &&
        txDate <= now
      );
    });
  
    const periods = [0, 0, 0, 0, 0]; 
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const periodLength = Math.ceil(daysInMonth / 5);
  
    monthlyTransactions.forEach((tx) => {
      const txDate = new Date(tx.createdAt.seconds * 1000);
      const day = txDate.getDate();
  
      const periodIndex = Math.min(Math.floor((day - 1) / periodLength), 4);
      periods[periodIndex] += tx.amount;
    });
  
    const total = periods.reduce((it, acc) => acc+it) 
    return {periods, total};
  };