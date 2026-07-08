import { formatDistanceToNow } from 'date-fns';

export function formatUploadTime(date: string) {
	return formatDistanceToNow(new Date(date), {
		addSuffix: true,
	});
}
