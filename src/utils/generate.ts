export function generateRandomAlias() {
  let randomString = "";
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < 8; i++) {
    randomString += characters.charAt(
      Math.floor(Math.random() * characters.length),
    );
  }

  return randomString;
}
