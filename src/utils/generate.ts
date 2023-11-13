export function generateRandomAlias() {
  let randomString = "";
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < 16; i++) {
    if (i > 0 && i % 4 === 0) {
      randomString += "-";
    }
    randomString += characters.charAt(
      Math.floor(Math.random() * characters.length),
    );
  }

  return randomString;
}
