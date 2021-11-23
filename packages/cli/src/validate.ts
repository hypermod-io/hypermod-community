import { isValidConfigAtPath, isValidPackageJson } from '@codeshift/validator';

export default async function validate(targetPath: string = '.') {
  try {
    await isValidConfigAtPath(targetPath);
    await isValidPackageJson(targetPath);
  } catch (error) {
    console.warn(error);
    process.exit(1);
  }

  console.log('Valid ✅');
}
