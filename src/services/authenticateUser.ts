const users = [
  { username: "User", password: "Password" },
  { username: "olx_usr1", password: "olx_pass" },
];

export const authenticateUser = (username: string, password: string) => {
  return users.some(
    (user) => user.username === username && user.password === password
  );
};
