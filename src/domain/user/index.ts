export interface UserIdentity {
	email: string;
	id: string;
	name: string;
	avatar: {} | null;
	xata: {
		createdAt: string;
		updatedAt: string;
		version: number;
	};
}
