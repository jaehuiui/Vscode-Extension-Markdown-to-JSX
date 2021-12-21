export const importSection = `import React from 'react';`;

export function renderSection(code: string) {
  return `export default function Output() {
    return (
      <div>${code}</div>
    )
  }`;
}