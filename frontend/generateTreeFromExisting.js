import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();

const IGNORE = new Set([
	'node_modules',
	'.git',
	'dist',
	'build',
	'.next',
	'venv',
	'.env',
	'coverage',
	'.cache',
	'out',
	'target',
	'__pycache__',
]);

const lines = [];

function walk(dir, prefix = '') {
	let entries = fs
		.readdirSync(dir, { withFileTypes: true })
		.filter((entry) => !IGNORE.has(entry.name))
		.sort((a, b) => {
			if (a.isDirectory() && !b.isDirectory()) return -1;
			if (!a.isDirectory() && b.isDirectory()) return 1;
			return a.name.localeCompare(b.name);
		});

	entries.forEach((entry, index) => {
		const isLast = index === entries.length - 1;
		const connector = isLast ? '└── ' : '├── ';

		lines.push(prefix + connector + entry.name);

		if (entry.isDirectory()) {
			const nextPrefix = prefix + (isLast ? '    ' : '│   ');
			walk(path.join(dir, entry.name), nextPrefix);
		}
	});
}

lines.push(path.basename(ROOT));
walk(ROOT);

const outputPath = path.join(ROOT, 'project_structure.txt');
fs.writeFileSync(outputPath, lines.join('\n'), 'utf8');

console.log(`Project structure written to:\n${outputPath}`);
