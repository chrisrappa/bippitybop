export default function getRandomInteger(min, max) {
  // Ensure min and max are integers
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};