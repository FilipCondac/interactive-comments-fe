/**
 * Calculates the time since a post was created
 */
const calculatePostDate = (date: Date | string): string => {
  if (!(date instanceof Date) && typeof date !== "string") {
    throw new Error("Invalid input");
  }

  const inputDate = date instanceof Date ? date : new Date(date);
  const currentDate = new Date();
  const age = currentDate.getTime() - inputDate.getTime();

  const seconds = Math.floor(age / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (age < 0) {
    throw new Error("Date cannot be in the future");
  }

  if (years > 0) {
    return `${years} year${years > 1 ? "s" : ""} ago`;
  }
  if (months > 0) {
    return `${months} month${months > 1 ? "s" : ""} ago`;
  }
  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }
  if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  }
  if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  }
  return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
};

export default calculatePostDate;
