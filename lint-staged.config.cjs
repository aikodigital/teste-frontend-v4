module.exports = {
  // Type check
  '**/*.{ts,tsx}': [() => 'tsc -p tsconfig.json --skipLibCheck --noEmit'],

  // Lint
  '**/*.{ts,tsx,js,jsx}': 'eslint --fix',

  // Format
  '**/*.{ts,tsx,js,jsx,md,json,html,css}': 'prettier --write',
};
