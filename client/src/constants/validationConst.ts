export const passwordOptions = {
  minLength: 6,
  minLowercase: 1,
  minUppercase: 0,
  minNumbers: 1,
  minSymbols: 0,
  returnScore: false,
  pointsPerUnique: 2,
  pointsPerRepeat: 1,
  pointsForContainingLower: 10,
  pointsForContainingUpper: 10,
  pointsForContainingNumber: 10,
  pointsForContainingSymbol: 10,
};

export const globalPasswordStrong = {
  veryBad: 0,
  bad: 20,
  normal: 40,
  good: 60,
  veryGood: 80,
};

export const globalPasswordMaxStrong = 50;

export const loginOptions = {
  min: 5,
  max: 30,
};

export const animationSpeed = Math.round(
  document.documentElement.scrollHeight / 2
);
