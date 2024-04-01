import {randomImages} from './data';

/**
 * Formats a date string from one format to another.
 * @param {string} inputDate The input date string.
 * @returns {string} The formatted date string according to the specified output format. Eg. "12 Jan 2023".
 */
export const formatDate = (inputDate?: string): string => {
  if (!inputDate) {
    return 'N/A';
  }

  const months: string[] = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const [year, month, day] = inputDate.split('-');
  const formattedMonth: string = months[Number(month) - 1];

  return `${Number(day)} ${formattedMonth} ${year}`;
};

/**
 * Parses a duration string and converts it to a formatted duration string.
 * @param {string} duration The duration string to parse (e.g., "PT2H30M4S").
 * @returns {string} The formatted duration string (e.g., "2h 30m 4s").
 */
export const parseDuration = (duration?: string): string => {
  if (!duration) {
    return 'N/A';
  }

  const durationWithoutPrefixAndSuffix = duration.slice(2, -1);

  // Split the duration into hours, minutes, and seconds
  const [hours, minutes, seconds] = durationWithoutPrefixAndSuffix
    .split(/[HMS]/)
    .filter(Boolean)
    .map(part => parseInt(part, 10));

  const formattedDuration: string[] = [];
  if (hours) {
    formattedDuration.push(`${hours}h`);
  }
  if (minutes) {
    formattedDuration.push(`${minutes}m`);
  }
  if (seconds) {
    formattedDuration.push(`${seconds}s`);
  }

  return formattedDuration.join(' ');
};

/**
 * Normalizes a rating value to a scale of 5.
 * @param {number} ratingValue The original rating value.
 * @param {number} bestRating The best possible rating value.
 * @returns {number} The normalized rating value on a scale of 5.
 */
export const normalizeRating = (
  ratingValue?: number,
  bestRating?: number,
): string => {
  if (!ratingValue || !bestRating) {
    return 'N/A';
  }
  const normalizedValue = (ratingValue / bestRating) * 5;
  return normalizedValue.toFixed(1);
};

// Function to pick a random image URL from the randomImages array
export const getRandomImageUrl = (): string => {
  const randomIndex = Math.floor(Math.random() * randomImages.length);
  return randomImages[randomIndex];
};
