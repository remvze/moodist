export function generateRandomBinaryString(length: number) {
  let binaryString = '';

  for (let i = 0; i < length; i++) {
    binaryString += Math.floor(Math.random() * 2);
  }

  return binaryString;
}
