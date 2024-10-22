import { UserIdentity } from "@domain/user";

declare module 'next-auth' {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		identity: UserIdentity;
	}
}
