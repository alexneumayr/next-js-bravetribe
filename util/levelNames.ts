export default function levelNames(experiencesAmount: number) {
  if (typeof experiencesAmount !== 'number') {
    throw new Error('Parameter must be a number');
  } else if (experiencesAmount < 0) {
    throw new Error('Parameter must not be a negative');
  } else if (experiencesAmount < 5) {
    return 'Challenge Rookie';
  } else if (experiencesAmount < 10) {
    return 'Challenge Padawan';
  } else if (experiencesAmount < 20) {
    return 'Challenge Explorer';
  } else if (experiencesAmount < 30) {
    return 'Challenge Adventurer';
  } else if (experiencesAmount < 40) {
    return 'Challenge Warrior';
  } else if (experiencesAmount < 50) {
    return 'Challenge Champion';
  } else if (experiencesAmount < 60) {
    return 'Challenge Veteran';
  } else if (experiencesAmount < 70) {
    return 'Challenge Hero';
  } else if (experiencesAmount < 80) {
    return 'Challenge Legend';
  } else if (experiencesAmount < 90) {
    return 'Challenge Master';
  } else {
    return 'Challenge Guru';
  }
}
