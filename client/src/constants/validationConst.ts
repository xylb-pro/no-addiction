export const passwordOptions = {
  minLength: 6,
  minLowercase: 1,
  minUppercase: 0,
  minNumbers: 1,
  minSymbols: 0,
  returnScore: false,
  pointsPerUnique: 1.5,
  pointsPerRepeat: 0.1,
  pointsForContainingLower: 5,
  pointsForContainingUpper: 5,
  pointsForContainingNumber: 5,
  pointsForContainingSymbol: 5,
};

export const globalPasswordStrong = {
  veryBad: 0,
  bad: 20,
  normal: 40,
  good: 60,
  veryGood: 80,
};

export const loginOptions = {
  min: 5,
  max: 30,
};

export const animationSpeed = Math.round(
  document.documentElement.scrollHeight / 2
);
