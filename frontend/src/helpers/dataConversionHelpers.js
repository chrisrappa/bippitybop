export const convertToDecimalFormat = (number) => {
  const numberString = number.toString();
  
  if (numberString.length < 2) {
    return '0.0' + numberString;
  } else {
    const firstTwoDigits = numberString.slice(0, 2);
    const remainingDigits = numberString.slice(2);
    
    const decimalFormat = `${firstTwoDigits}.${remainingDigits}`;
    return decimalFormat;
  }
};