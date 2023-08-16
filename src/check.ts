export function checkCheckbox(
  prDescription: string,
  checkboxes: string[]
): string {
  let newDescription = prDescription
  for (const cb of checkboxes) {
    newDescription = newDescription.replace(`- [ ] ${cb}`, `- [x] ${cb}`)
  }
  return newDescription
}
