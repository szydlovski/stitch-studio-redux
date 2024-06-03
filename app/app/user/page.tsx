import { SinglePageLayout } from '@/components/layout/dashboard/SinglePageLayout';
import { UserPageContent } from './UserPageContent';

export default function UserPage() {
	return (
		<SinglePageLayout header={'User Settings'}>
			<UserPageContent />
		</SinglePageLayout>
	);
}
