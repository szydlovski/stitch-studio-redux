export interface UserIdentity {
	email: string;
	id: string;
	name: string;
	xata: {
		createdAt: string;
		updatedAt: string;
		version: number;
	};
}

declare module 'next-auth' {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		identity: UserIdentity;
	}
}
