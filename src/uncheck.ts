export function uncheckCheckbox(
  prDescription: string,
  checkboxes: string[]
): string {
  let newDescription = prDescription
  for (const cb of checkboxes) {
    newDescription = newDescription.replace(`- [x] ${cb}`, `- [ ] ${cb}`)
  }
  return newDescription
}
