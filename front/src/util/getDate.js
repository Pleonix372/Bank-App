export const getDate = (time) => {
  // Створення об'єкта Date на основі Unix-часу
  const date = new Date(time);

  // Отримання дати та часу в потрібному форматі
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  // Форматування результату в "dd.mm hh.mm" і виведення
  const formattedDate = `${day}.${month} ${hours}:${minutes}`;

  return formattedDate;
};

export const getFormattedDate = (time) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date(time);
  const day = date.getDate().toString().padStart(2, "0");
  const monthIndex = date.getMonth();
  const month = months[monthIndex];
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const formattedDate = `${day} ${month}, ${hours}:${minutes}`;

  return formattedDate;
};

export const getTimeAgo = (time) => {
  const currentTime = new Date();
  const cardTime = new Date(time);

  const diffMilliseconds = currentTime - cardTime;
  const diffSeconds = Math.floor(diffMilliseconds / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) {
    return "Just now";
  } else if (diffHours < 1) {
    return `${diffMinutes} min ago`;
  } else if (diffDays < 1) {
    return `${diffHours} hours ago`;
  } else {
    return `${diffDays} days ago`;
  }
};
