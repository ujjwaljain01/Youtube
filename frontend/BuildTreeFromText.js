import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url'; // Added to handle ES module pathing

// Reconstruct __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function generateFromTreeText(txtFilePath) {
	try {
		const content = fs.readFileSync(txtFilePath, 'utf-8');
		const lines = content.split(/\r?\n/);

		const depthMap = { '-1': process.cwd() };
		const indexFilesToGenerate = [];

		lines.forEach((line) => {
			if (!line.trim() || /^[\s\u2502\|\-\+]+$/.test(line)) return;

			const match = line.match(/[a-zA-Z0-9_\-\.]/);
			if (!match) return;

			const charDepth = match.index;
			const cleanName = line.substring(charDepth).trim();
			const isFile = cleanName.includes('.') && !cleanName.endsWith('/');
			const finalName = cleanName.endsWith('/')
				? cleanName.slice(0, -1)
				: cleanName;

			const historyDepths = Object.keys(depthMap)
				.map(Number)
				.filter((d) => d < charDepth)
				.sort((a, b) => b - a);

			const parentDir = depthMap[historyDepths[0]] || depthMap['-1'];
			const targetPath = path.join(parentDir, finalName);

			if (!isFile) {
				fs.mkdirSync(targetPath, { recursive: true });
				depthMap[charDepth] = targetPath;
				console.log(
					`📁 Created Folder: ${path.relative(process.cwd(), targetPath)}`,
				);
			} else {
				const fileDir = path.dirname(targetPath);
				fs.mkdirSync(fileDir, { recursive: true });

				if (!fs.existsSync(targetPath)) {
					fs.writeFileSync(targetPath, '');
					console.log(
						`📄 Created File: ${path.relative(process.cwd(), targetPath)}`,
					);
				}

				if (finalName === 'index.ts') {
					indexFilesToGenerate.push(targetPath);
				}
			}
		});

		indexFilesToGenerate.forEach((indexPath) => {
			const folderPath = path.dirname(indexPath);
			const siblings = fs.readdirSync(folderPath);

			const exportLines = siblings
				.filter((file) => {
					const fullPath = path.join(folderPath, file);
					const isDir = fs.statSync(fullPath).isDirectory();
					return (
						isDir ||
						(/\.(ts|tsx|js|jsx)$/.test(file) && file !== 'index.ts')
					);
				})
				.map((file) => {
					const cleanExportName = file.replace(
						/\.(ts|tsx|js|jsx)$/,
						'',
					);
					return `export * from './${cleanExportName}';`;
				});

			if (exportLines.length > 0) {
				fs.writeFileSync(indexPath, exportLines.join('\n') + '\n');
				console.log(
					`⚡ Injected Boilerplate into: ${path.relative(process.cwd(), indexPath)}`,
				);
			}
		});

		console.log(
			'\n🚀 Tree structure and TypeScript barrel exports created successfully!',
		);
	} catch (error) {
		console.error('❌ Error parsing tree:', error.message);
	}
}

// This will now execute perfectly using the reconstructed __dirname
generateFromTreeText(path.join(__dirname, 'structure.txt'));
