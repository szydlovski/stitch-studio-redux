import { getUserByEmail } from '@/lib/getUserByEmail';
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

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

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Google({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
	callbacks: {
		jwt: async ({ token, account, user }) => {
			if (account) {
				const email = user.email;
				if (!email) throw new Error('No email returned from Google');
				const userRecord = await getUserByEmail(email);
				if (!userRecord) throw new Error('User not found');
				token.identity = userRecord.toSerializable();
			}
			return token;
		},
		session: async ({ session, token }) => {
			session.identity = token.identity as UserIdentity;
			return session;
		},
	},
});
