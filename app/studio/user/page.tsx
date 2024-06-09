import { SinglePageLayout } from '@/presentation/layout';
import { UserPageContent } from './UserPageContent';

export default function UserPage() {
	return (
		<SinglePageLayout header={'User Settings'}>
			<UserPageContent />
		</SinglePageLayout>
	);
}
