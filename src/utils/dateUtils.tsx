export const convertDurationToMMSS = (second: number) => {
  const minutes = Math.floor(second / 60);
  const remainingSeconds = Math.floor(second % 60);

  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}

