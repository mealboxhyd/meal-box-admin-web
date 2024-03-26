import moment from "moment";

const currentDay = new Date().toLocaleString("en", {
  weekday: "long",
});

const formatDate = (date: string) => {
  const dateFormat = moment(date).format("D/MM/YYYY");
  return dateFormat;
};

const timeAgo = (date: string) => {
  return moment(date, "YYYYMMDD").fromNow();
};

const formatDateTime = (date: string) => {
  return moment(date).format("llll");
};

export { currentDay, formatDate, timeAgo, formatDateTime };
