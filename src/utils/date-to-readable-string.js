export function dateToReadableString(dateString) {
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const readableString = date.toLocaleDateString("ru-RU", options);
  const hours = date.getHours();
  const seconds = date.getSeconds();
  const time = `${hours < 10 ? "0" + hours : hours}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;
  return `${readableString} в ${time}`;
}
