export const getCurrentMonth = () => {
    const timestamp = Date.now(); 
    const date = new Date(timestamp); // Creating Date object using the timestamp
    const month = date.getMonth(); // Getting the month
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return monthNames[month]; 
  };