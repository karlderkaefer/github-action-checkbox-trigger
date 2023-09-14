import * as core from '@actions/core'

export enum CheckboxAction {
  Check = 'check',
  Uncheck = 'uncheck'
}

/**
 * Determines the new checkbox state based on the given action.
 *
 * @param action - The desired action to be taken (check or uncheck).
 * @returns 'x' if action is to check, ' ' if action is to uncheck.
 */
function getCheckboxState(action: CheckboxAction): string {
  return action === CheckboxAction.Check ? 'x' : ' '
}

/**
 * Modifies the checkboxes in the given PR description based on the specified action.
 *
 * @param prDescription - The PR description containing markdown checkboxes.
 * @param checkboxes - List of checkboxes to modify.
 * @param action - The desired action (check or uncheck) to be taken on the specified checkboxes.
 * @returns A modified PR description with the checkboxes checked or unchecked based on the action.
 */
export function modifyCheckboxes(
  prDescription: string,
  checkboxes: string[],
  action: CheckboxAction
): string {
  const regex = /-\s*\[([xX ]*)\]\s*(.*?)(?=\n|$)/g

  return prDescription.replace(regex, (match, state, checkboxText) => {
    if (checkboxes.includes(checkboxText.trim())) {
      const newCheckboxState = getCheckboxState(action)
      core.debug(`${action} checkbox: ${checkboxText}`)
      return `- [${newCheckboxState}] ${checkboxText}`
    }
    return match
  })
}
