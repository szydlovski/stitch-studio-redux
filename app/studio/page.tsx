import { redirect } from 'next/navigation';
import { AppViews } from '../routes';

export default function Home() {
	return redirect(AppViews.Dashboard());
}
