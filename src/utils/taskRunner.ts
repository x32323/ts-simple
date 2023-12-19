import { glob } from 'glob';

async function main() {
  const [fileKeyword, ...args] = process.argv.slice(2);

  if (!fileKeyword) {
    console.error('Please provide a script file.');
    process.exit(1);
  }

  const tsfiles = await glob(`**/*${fileKeyword}*?(.ts)`, {
    ignore: ['node_modules/**', 'dist/**', '**/*.d.ts', '**/*.test.ts', '**/*.spec.ts'],
  });

  if (tsfiles.length === 0) {
    console.error(`No file found for ${fileKeyword}`);
    process.exit(1);
  } else if (tsfiles.length > 1) {
    console.error(`More than one file found for ${fileKeyword}`);
    console.error(tsfiles);
    process.exit(1);
  }

  console.log(`Running ${tsfiles[0]}`);
  const func = await tryToImport(`${process.cwd()}/${tsfiles[0]}`);
  try {
    const result = await func(...args);
    console.log({
      result,
    });
  } catch (error) {
    console.error(error);
  }
}

main();

async function tryToImport(filePath: string) {
  try {
    const module = await import(filePath);
    const func = module.default;
    if (typeof func != 'function') {
      console.error(`The default export of ${filePath} is not a function`);
      process.exit(1);
    }
    return func;
  } catch (err) {
    console.error(err);
    console.error('Import error, please check the default export of the file');
    process.exit(1);
  }
}
