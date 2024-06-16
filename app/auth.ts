import { UserIdentity } from '@domain/user';
import { GetUserByEmailQuery } from '@infrastructure/user';
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

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
				try {
					const userRecord = await new GetUserByEmailQuery().execute(email);
					token.identity = userRecord;
				} catch (error) {
					throw new Error('User not found');
				}
			}
			return token;
		},
		session: async ({ session, token }) => {
			session.identity = token.identity as UserIdentity;
			return session;
		},
	},
});
