import { useSession } from 'next-auth/react';

// export const useIdentity = () => {
// 	const session = useSession();
// 	if (!session?.data) throw new Error('No session found within safe context');
// 	const { identity } = session.data;
// 	return identity;
// };
