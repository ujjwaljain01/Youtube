// src/components/media/ImagePicker.tsx

import { ImagePlus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

interface ImagePickerProps {
	label: string;

	value?: File;

	onChange: (file?: File) => void;

	required?: boolean;
}

export function ImagePicker({
	label,
	value,
	onChange,
	required,
}: ImagePickerProps) {
	const [preview, setPreview] = useState<string>();

	useEffect(() => {
		if (!value) {
			setPreview(undefined);
			return;
		}

		const objectUrl = URL.createObjectURL(value);

		setPreview(objectUrl);

		return () => URL.revokeObjectURL(objectUrl);
	}, [value]);

	return (
		<div className="space-y-3">
			<label className="text-sm font-medium">
				{label}

				{required && <span className="text-destructive"> *</span>}
			</label>

			<div className="flex items-center gap-4">
				<div className="h-24 w-24 overflow-hidden rounded-xl border bg-muted">
					{preview ? (
						<img
							src={preview}
							alt={label}
							className="h-full w-full object-cover"
						/>
					) : (
						<div className="flex h-full items-center justify-center">
							<ImagePlus className="text-muted-foreground" />
						</div>
					)}
				</div>

				<div className="flex flex-col gap-2">
					<label>
						<Button asChild type="button">
							<span>Select Image</span>
						</Button>

						<input
							hidden
							type="file"
							accept="image/*"
							onChange={(e) => onChange(e.target.files?.[0])}
						/>
					</label>

					{value && (
						<Button
							type="button"
							variant="outline"
							onClick={() => onChange(undefined)}
						>
							<Trash2 className="mr-2 h-4 w-4" />
							Remove
						</Button>
					)}
				</div>
			</div>
		</div>
	);
}
