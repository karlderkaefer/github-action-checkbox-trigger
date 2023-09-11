export enum CheckboxAction {
  Check = 'check',
  Uncheck = 'uncheck'
}

export function modifyCheckboxes(
  prDescription: string,
  checkboxes: string[],
  action: CheckboxAction
): string {
  const regex = /^- \[([xX ]*)\]\s*(.*)$/
  const lines = prDescription.split('\n')
  const newLines = lines.map(line => {
    const match = regex.exec(line)
    if (match !== null && checkboxes.includes(match[2].trim())) {
      const newCheckboxState = action === CheckboxAction.Check ? 'x' : ' '
      const newLine = `- [${newCheckboxState}] ${match[2]}`
      return newLine
    }
    return line
  })
  return newLines.join('\n')
}
