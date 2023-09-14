import * as core from '@actions/core'

export function detectCheckboxes(prDescription: string): {
  checked: string[]
  unchecked: string[]
} {
  const checked: string[] = []
  const unchecked: string[] = []
  const regex = /^-\s*\[([xX ]*)\]\s*(.*)$/gm
  let match
  while ((match = regex.exec(prDescription)) !== null) {
    core.info(`Got match: ${match}`)
    const checkbox = match[1].trim()
    const text = match[2].trim()
    core.info(`Found checkbox: ${checkbox} and text: ${text}`)
    if (checkbox === 'x' || checkbox === 'X') {
      checked.push(text)
    } else {
      unchecked.push(text)
    }
  }
  core.setOutput('checked', checked.join(','))
  core.setOutput('unchecked', unchecked.join(','))

  return {checked, unchecked}
}
