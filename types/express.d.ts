import { User as ClerkUser } from "@clerk/clerk-sdk-node";

declare global {
  namespace Express {
    interface Request {
      auth?: {
        user: {
          id: string;
          firstName?: string;
          lastName?: string;
          emailAddresses?: { emailAddress: string }[];
        };
        sessionId: string;
        getToken: () => Promise<string>;
      };
    }
  }
}