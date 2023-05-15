module.exports = {
  format_date: (date) => {
    console.log(
      "++++++++++++++++++++++++++++++++++++++++++++++++++\nDate helper received:",
      date
    );
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
};
