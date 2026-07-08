import { Skeleton } from '@/components/ui/skeleton';

export function TweetCardSkeleton() {
	return (
		<div className="rounded-2xl border p-5 space-y-5">
			<div className="flex gap-3">
				<Skeleton className="h-10 w-10 rounded-full" />

				<div className="space-y-2">
					<Skeleton className="h-4 w-28" />

					<Skeleton className="h-3 w-20" />
				</div>
			</div>

			<Skeleton className="h-4 w-full" />
			<Skeleton className="h-4 w-full" />
			<Skeleton className="h-4 w-2/3" />

			<div className="flex justify-between">
				<Skeleton className="h-8 w-16" />
				<Skeleton className="h-8 w-16" />
				<Skeleton className="h-8 w-16" />
			</div>
		</div>
	);
}
