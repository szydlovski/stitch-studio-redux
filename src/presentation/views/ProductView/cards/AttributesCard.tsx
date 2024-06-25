import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@components/ui';
import { useProductContext } from '../ProductContext';
import JsonView from '@uiw/react-json-view';
import { useTheme } from 'next-themes';
import { githubLightTheme } from '@uiw/react-json-view/githubLight';
import { githubDarkTheme } from '@uiw/react-json-view/githubDark';

export const AttributesCard = () => {
	const { product } = useProductContext();
	const { theme } = useTheme();

	return (
		<Card>
			<CardHeader>
				<CardTitle>Attributes</CardTitle>
				<CardDescription>
					<span>
						Use this tool to directly edit the payload of your product attributes.
						This is an advanced feature, but it can help you in a pinch.
					</span>
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="rounded-md p-4 border">
					<JsonView
						value={product.attributes}
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
