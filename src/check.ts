import * as core from '@actions/core'
import {CheckboxActionType} from './model'

export function modifyCheckboxes(
  prDescription: string,
  checkboxes: string[],
  action: CheckboxActionType
): string {
  let newDescription = prDescription
  const regex = /^- \[([xX ]*)\]\s*(.*)$/gm
  let match: RegExpExecArray | null
  while ((match = regex.exec(newDescription)) !== null) {
    const checkboxText = match[2].trim()
    if (checkboxes.includes(checkboxText)) {
      const checkboxState = match[1].toLowerCase()
      if (
        (action === CheckboxActionType.Check && checkboxState !== 'x') ||
        (action === CheckboxActionType.Uncheck && checkboxState === 'x')
      ) {
        newDescription = newDescription.replace(
          new RegExp(`^- \\[${match[1]}\\]\\s*${checkboxText}`, 'm'),
          `- [${
            action === CheckboxActionType.Check ? 'x' : ' '
          }] ${checkboxText}`
        )
        core.info(
          `${
            action === CheckboxActionType.Check ? 'Checked' : 'Unchecked'
          } ${checkboxText}`
        )
      }
    }
  }
  return newDescription
}
