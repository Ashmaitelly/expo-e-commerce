const users = [
  { username: "User", password: "Password" },
  { username: "usr1", password: "pass" },
];

export const authenticateUser = (username: string, password: string) => {
  return users.some(
    (user) => user.username === username && user.password === password
  );
};
