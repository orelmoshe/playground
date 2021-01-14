const checkIfSameDate = (date1, date2) => date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();

const changeFormat = (date) => `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

export { checkIfSameDate, changeFormat };
