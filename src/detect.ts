import * as core from '@actions/core'

export function detectCheckboxes(prDescription: string): {
  checked: string[]
  unchecked: string[]
} {
  const checked: string[] = []
  const unchecked: string[] = []
  const lines = prDescription.split('\n')
  for (const line of lines) {
    if (line.startsWith('- [x]')) checked.push(line.substring(6).trim())
    if (line.startsWith('- [ ]')) unchecked.push(line.substring(6).trim())
  }

  core.setOutput('checked', checked.join(','))
  core.setOutput('unchecked', unchecked.join(','))

  return {checked, unchecked}
}
