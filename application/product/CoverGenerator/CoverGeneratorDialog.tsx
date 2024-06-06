'use client';
import { Button } from '@/components/ui';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { WandSparklesIcon } from 'lucide-react';
import { useProductContext } from '@/components/context/ProductContext';
import {
	CoverGeneratorProvider,
	useCoverGeneratorContext,
} from './CoverGeneratorContext';
import { Stepper } from './Stepper';
import { COVER_GENERATOR_STEPS, COVER_GENERATOR_STEPS_ORDER } from './config';
import { useDisclosure } from '@/lib/hooks/useDisclosure';

export const CoverGeneratorDialogContent = () => {
	const {
		stepper: { step, setStep },
	} = useCoverGeneratorContext();
	const { component: StepComponent } = COVER_GENERATOR_STEPS[step];
	return (
		<DialogContent className="flex max-w-5xl p-0 gap-0">
			<div className="flex col-span-2 bg-muted p-6 rounded-md rounded-r-none">
				<Stepper
					onStepClick={(key) => setStep(key)}
					value={step}
					steps={COVER_GENERATOR_STEPS_ORDER.map((key) => {
						const config = COVER_GENERATOR_STEPS[key];
						return {
							key: config.key,
							title: config.title,
							description: config.description,
						};
					})}
				/>
			</div>
			<div className="flex flex-col flex-1 col-span-4 p-6">
				<StepComponent />
			</div>
		</DialogContent>
	);
};

export const CoverGeneratorDialog = () => {
	const { product, pattern } = useProductContext();
	const { state: isOpen, set: setOpen, close } = useDisclosure();
	return (
		<Dialog open={isOpen} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button size="xs" variant="outline" className="flex gap-1">
					<WandSparklesIcon size={16} />
					<span>{'Cover generator'}</span>
				</Button>
			</DialogTrigger>
			<CoverGeneratorProvider
				product={product}
				pattern={pattern}
				onClose={close}
			>
				<CoverGeneratorDialogContent />
			</CoverGeneratorProvider>
		</Dialog>
	);
};
