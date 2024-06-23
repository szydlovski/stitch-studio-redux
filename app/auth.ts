import { getXataClient } from '@lib/xata';
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
					let userRecord = await new GetUserByEmailQuery().execute(email);
					if (userRecord.avatar === null) {
						console.log('User has no avatar!');
						if (user.image) {
							const fetchedImage = await fetch(user.image).then((res) =>
								res.blob()
							);
							await getXataClient().files.upload(
								{
									table: 'user',
									column: 'avatar',
									record: userRecord.id,
								},
								fetchedImage
							);
							userRecord = await new GetUserByEmailQuery().execute(email);
						}
					}
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
