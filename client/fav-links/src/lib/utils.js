import { format } from "timeago.js";

export function timeAgo(timestamp) {
  return format(timestamp);
}

export function sorted(data) {
  return data.sort((a, b) => b.id - a.id);
}
