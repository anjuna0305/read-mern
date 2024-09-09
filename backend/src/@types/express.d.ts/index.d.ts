// src/@types/express/index.d.ts

import { IUser } from '../../models/User'; // Adjust the path based on your project structure

declare global {
  namespace Express {
    interface User extends IUser {} // Extending the User object to include your custom IUser properties
  }
}
