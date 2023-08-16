import * as core from '@actions/core'

export function checkCheckbox(
  prDescription: string,
  checkboxes: string[]
): string {
  let newDescription = prDescription
  for (const cb of checkboxes) {
    newDescription = newDescription.replace(`- [ ] ${cb}`, `- [x] ${cb}`)
    core.info(`Checked ${cb}`)
  }
  return newDescription
}
