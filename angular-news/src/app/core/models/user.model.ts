export interface User {
  id: string;
  name: string;
  email: string;
}

/**
 * Internal record persisted in localStorage. Includes the (insecure, demo-only)
 * password hash used purely to validate the simulated login flow.
 */
export interface StoredUser extends User {
  passwordHash: string;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
