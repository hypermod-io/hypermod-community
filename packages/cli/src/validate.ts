import { isValidConfigAtPath, isValidPackageJson } from '@codeshift/validator';

export default async function validate(targetPath = '.') {
  await isValidConfigAtPath(targetPath);
  await isValidPackageJson(targetPath);

  console.log('Valid ✅');
}
