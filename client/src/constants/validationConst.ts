export const passwordOptions = {
  minLength: 6,
  minLowercase: 1,
  minUppercase: 0,
  minNumbers: 1,
  minSymbols: 0,
  returnScore: false,
  pointsPerUnique: 1,
  pointsPerRepeat: 0.1,
  pointsForContainingLower: 5,
  pointsForContainingUpper: 5,
  pointsForContainingNumber: 5,
  pointsForContainingSymbol: 10,
};

export const loginOptions = {
  min: 5,
  max: 30,
};

export const animationSpeed = Math.round(
  document.documentElement.scrollHeight / 2
);
