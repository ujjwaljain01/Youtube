// src/components/media/ImagePicker.tsx

import { ImagePlus, Trash2 } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ImagePickerProps {
    value?: File;
    onChange: (file?: File) => void;
    className?: string;
    placeholder?: string;
}

export function ImagePicker({
    value,
    onChange,
    className,
    placeholder = "Click to upload image"
}: ImagePickerProps) {
    const [preview, setPreview] = useState<string>();
    const inputRef = useRef<HTMLInputElement>(null);

    // Handle object URL creation and cleanup
    useEffect(() => {
        if (!value) {
            setPreview(undefined);
            return;
        }

        const objectUrl = URL.createObjectURL(value);
        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [value]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onChange(file);
        }
    };

    const handleRemove = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onChange(undefined);
        
        // Reset the input value so the same file can be uploaded again if needed
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    return (
        <div className={cn("relative group w-full overflow-hidden transition-all", className)}>
            {preview ? (
                /* Active Preview State */
                <div className="relative aspect-video w-full rounded-[var(--radius)] overflow-hidden border border-border bg-muted/30">
                    <img 
                        src={preview} 
                        alt="Upload preview" 
                        className="w-full h-full object-cover"
                    />
                    
                    {/* Hover Overlay with Action */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center backdrop-blur-[2px]">
                        <Button 
                            type="button" 
                            variant="destructive" 
                            size="sm"
                            onClick={handleRemove}
                            className="gap-2 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform text-white duration-200"
                        >
                            <Trash2 className="w-4 h-4" />
                            Remove Image
                        </Button>
                    </div>
                </div>
            ) : (
                /* Empty Upload State */
                <label 
                    className="flex flex-col items-center justify-center w-full aspect-video border-2 border-dashed border-border rounded-[var(--radius)] cursor-pointer bg-card hover:bg-muted/50 hover:border-primary/50 transition-colors duration-200"
                >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-muted-foreground group-hover:text-foreground transition-colors">
                        <div className="p-4 rounded-full bg-background mb-4 shadow-sm border border-border group-hover:border-primary/30 group-hover:text-primary transition-colors">
                            <ImagePlus className="w-6 h-6" />
                        </div>
                        
                        <p className="mb-2 text-sm font-semibold">
                            {placeholder}
                        </p>
                        <p className="text-xs text-muted-foreground/70">
                            SVG, PNG, JPG or WEBP (max. 5MB)
                        </p>
                    </div>
                    
                    <input 
                        ref={inputRef}
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </label>
            )}
        </div>
    );
}