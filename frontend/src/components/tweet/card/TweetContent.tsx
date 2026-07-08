interface Props {
	content: string;
}

export function TweetContent({ content }: Props) {
	return (
		<p
			className="
				line-clamp-6
				text-sm
				leading-7
			"
		>
			{content}
		</p>
	);
}
