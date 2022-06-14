// function pad(num) {
//   if (num < 10) {
//     return "0" + String(num);
//   }
//   return String(num);
// }

// function getCurrentDate() {
//   var date = new Date();
//   return (
//     date.getFullYear() +
//     "-" +
//     pad(date.getMonth() + 1) +
//     "-" +
//     pad(date.getDate())
//   );
// }

// function isDateString(str) {
//   if (typeof str !== "string") {
//     return false;
//   }
//   var dateTime = str.split(" ");
//   if (dateTime[0].split("-").length === 3) {
//     return true;
//   } else {
//     return false;
//   }
// }

// function formatDateResponse(resDate) {
//   if (typeof resDate !== "string") return resDate;

//   var dateTime = resDate.split(" ");
//   var date = dateTime[0].replace(/-/g, "");
//   var time;
//   if (dateTime[1]) {
//     time = dateTime[1].replace(/:/g, "");
//   } else {
//     time = "";
//   }

//   return date + time;
// }

// function getDateString(windowCode) {
//   var windowMapping = {
//     0: 7,
//     1: 30,
//     2: 90,
//     3: 180,
//     4: 365,
//   };

//   var lastDays = 0;
//   if (windowCode !== undefined) {
//     lastDays = windowMapping[windowCode] || 0;
//   }

//   return new Date(Date.now() - lastDays * 24 * 60 * 60 * 1000)
//     .toISOString()
//     .split("T")[0];
// }
