import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@components/ui';
import { useBrandViewContext } from '../BrandViewContext';
import JsonView from '@uiw/react-json-view';
import { useTheme } from 'next-themes';
import { githubLightTheme } from '@uiw/react-json-view/githubLight';
import { githubDarkTheme } from '@uiw/react-json-view/githubDark';

export const AttributesCard = () => {
	const { brand } = useBrandViewContext();
	const { theme } = useTheme();
	console.log(theme);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Attributes</CardTitle>
				<CardDescription>
					<span>
						Use this tool to directly edit the payload of your brand attributes.
						This is an advanced feature, but it can help you in a pinch.
					</span>
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="rounded-md p-4 border">
					<JsonView
						value={brand.attributes}
						style={theme === 'light' ? githubLightTheme : githubDarkTheme}
					/>
				</div>
			</CardContent>
			<CardFooter>
				<Button disabled className="ml-auto">
					Save
				</Button>
			</CardFooter>
		</Card>
	);
};
