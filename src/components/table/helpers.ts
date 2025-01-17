import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

export function formatDateTime(isoString: string | null): string {
  if (isoString === null) {
    return "Нет данных";
  }

  const date = new Date(isoString);

  if (isNaN(date.getTime())) {
    return "Нет данных";
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}.${month}.${year} ${hours}:${minutes}`;
}

dayjs.extend(utc);

export function toCustomISOStringWithDayjs(date: Date): string {
  const dayjsDate = dayjs(date).utc();
  const formattedDate = dayjsDate.format("YYYY-MM-DDTHH:mm:ss");
  const milliseconds = String(date.getUTCMilliseconds()).padStart(3, "0");
  const extendedMilliseconds = `${milliseconds}0777`;

  return `${formattedDate}.${extendedMilliseconds}Z`;
}