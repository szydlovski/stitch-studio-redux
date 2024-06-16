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
