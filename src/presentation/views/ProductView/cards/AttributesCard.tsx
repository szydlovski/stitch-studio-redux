import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@components/ui';
import { useProductViewContext } from '../ProductViewContext';
import JsonView from '@uiw/react-json-view';
import { useTheme } from 'next-themes';
import { githubLightTheme } from '@uiw/react-json-view/githubLight';
import { githubDarkTheme } from '@uiw/react-json-view/githubDark';
import { CircleHelpIcon, LucideProps } from 'lucide-react';

const ExplainerIcon = (props: LucideProps & { tooltip: string }) => {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<CircleHelpIcon className="opacity-50" size={18} />
			</TooltipTrigger>
			<TooltipContent className="w-[300px] text-sm">
				{props.tooltip}
			</TooltipContent>
		</Tooltip>
	);
};

export const AttributesCard = () => {
	const { product } = useProductViewContext();
	const { theme } = useTheme();

	return (
		<Card>
			<CardHeader className='flex flex-row items-center gap-2'>
				<CardTitle className="flex items-center gap-2">Attributes</CardTitle>
				<ExplainerIcon tooltip="Use this tool to directly edit the payload of your product attributes. This is an advanced feature, but it can help you in a pinch." />
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
