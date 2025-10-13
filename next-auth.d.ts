import NextAuth, { DefaultSession } from "next-auth"

// This is a TypeScript feature called module augmentation.
// It allows you to 'reach into' a library's types and extend them.
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's database id. */
      id: string;
    } & DefaultSession["user"] // Inherit the default properties (name, email, image)
  }
}