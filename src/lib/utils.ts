import type { DateObject } from './components/modifiers';

export function parseData(inputText: string) {
	if (!inputText.trim()) return [];

	return inputText
		.trim()
		.split(/\r?\n/)
		.map((row) => {
			const columns = row.split('\t');
			console.log(columns);

			const date = columns[0]?.trim();
			const labels = columns[2]?.trim();

			if (!date || !labels) return [];

			return {
				date,
				labels: labels
					.split(',')
					.map((label) => label.trim())
					.filter(Boolean)
			};
		})
		.filter((entry): entry is DateObject => entry !== null)
		.sort((a, b) => a.date.localeCompare(b.date));
}
