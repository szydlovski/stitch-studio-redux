'use client';
import { DropdownMenu } from '@components/DropdownMenu';
import {
	Button,
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	ScrollArea,
	Slider,
	DialogTitle,
} from '@components/ui';
import { FlossColor } from '@domain/cross-stitch';
import { cn } from '@lib/utils';
import { EllipsisIcon, PaletteIcon } from 'lucide-react';
import { useCrossStitchEditorContext } from '../../CrossStitchEditorContext';
import { CrossStitchEditorActions } from '../../crossStitchEditorReducer';
import { MAX_ZOOM, MIN_ZOOM, ZOOM_SLIDER_STEP } from '../../constants';
import { useDisclosure } from '@lib/hooks/useDisclosure';
import { useCallback, useMemo, useState } from 'react';
import { ColorItem } from './ColorItem';
import { PALETTES } from '@lib/palette';
import { hexToRgb } from '@lib/color';
import { initialState } from '@uiw/react-json-view';

export const ColorTile = ({ color }: { color: string }) => {
	return (
		<div className="w-8 h-8 rounded-md" style={{ backgroundColor: color }} />
	);
};

export const ZoomSlider = () => {
	const { state, dispatch } = useCrossStitchEditorContext();
	return (
		<div className="flex">
			<span className="text-center w-12">{state.scale.toFixed(1)}</span>
			<Slider
				value={[state.scale]}
				min={MIN_ZOOM}
				max={MAX_ZOOM}
				step={ZOOM_SLIDER_STEP}
				onValueChange={([scale]) =>
					dispatch(CrossStitchEditorActions.setScale(scale))
				}
			/>
		</div>
	);
};

export const ReplaceColorDialog = ({
	open,
	onOpenChange,
	initialState: floss,
}: {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	initialState: FlossColor;
}) => {
	const palette = PALETTES.DMC;
	const sortedPaletteColors = useMemo(() => {
		const [r, g, b] = hexToRgb(floss.color);
		// sort by euclidean distance
		return palette.colors
			.map((floss) => {
				const [r2, g2, b2] = hexToRgb(floss.color);
				return {
					floss,
					distance: Math.sqrt((r - r2) ** 2 + (g - g2) ** 2 + (b - b2) ** 2),
				};
			})
			.sort((a, b) => a.distance - b.distance);
	}, [palette, floss.color]);
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Replace color</DialogTitle>
				</DialogHeader>
				<div>
					<div>
						<ColorTile color={floss.color} />
					</div>
					<div>id: {floss.id}</div>
					<div>name: {floss.name}</div>
					<div>palette: {floss.palette}</div>
					<div>symbol: {floss.symbol}</div>
				</div>
				<ScrollArea className="h-[200px]">
					<div className="flex flex-wrap">
						{sortedPaletteColors.map(({ floss: { name, color }, distance }) => (
							<>
								<div
									className="w-8 h-8 rounded-md"
									key={name}
									style={{ backgroundColor: color }}
								/>
								{distance}
							</>
						))}
					</div>
				</ScrollArea>
				<DialogFooter>
					<Button variant="outline">Cancel</Button>
					<Button>Save</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export const ColorsPanel = () => {
	const { state, dispatch } = useCrossStitchEditorContext();
	const { state: isOpen, open, set: setIsOpen } = useDisclosure();
	const [editColor, setEditColor] = useState<FlossColor>();
	const openReplaceDialog = useCallback((color: FlossColor) => {
		setEditColor(color);
		open();
	}, []);
	return (
		<>
			<div className="absolute h-full top-0 right-0 bg-muted border-l flex flex-col w-[250px]">
				<ScrollArea className="flex-1 w-full border-b">
					<div className="flex flex-col py-2">
						{state.colors.map((color) => (
							<ColorItem
								key={color.id}
								color={color}
								isActive={state.activeColorId === color.id}
								onClick={() =>
									dispatch(CrossStitchEditorActions.setActiveColor(color.id))
								}
								onReplace={() => openReplaceDialog(color)}
							/>
						))}
					</div>
				</ScrollArea>
				<div className="flex flex-col p-2">
					<Button variant="outline" size="sm">
						Add color...
					</Button>
				</div>
				<ZoomSlider />
			</div>
			{editColor && (
				<ReplaceColorDialog
					initialState={editColor}
					open={isOpen}
					onOpenChange={setIsOpen}
				/>
			)}
		</>
	);
};
