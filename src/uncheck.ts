import * as core from '@actions/core'

export function uncheckCheckbox(
  prDescription: string,
  checkboxes: string[]
): string {
  let newDescription = prDescription
  for (const cb of checkboxes) {
    newDescription = newDescription.replace(`- [x] ${cb}`, `- [ ] ${cb}`)
    core.info(`Checked ${cb}`)
  }
  return newDescription
}
