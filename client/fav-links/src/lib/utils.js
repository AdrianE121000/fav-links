import { format } from 'timeago.js';

export function timeAgo(timestamp) {
  return format(timestamp);
}
