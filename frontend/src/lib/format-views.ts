export function formatViews(views: number) {
	return new Intl.NumberFormat('en', {
		notation: 'compact',
	}).format(views);
}
