import * as core from '@actions/core'

export function detectCheckboxes(prDescription: string): {
  checked: string[]
  unchecked: string[]
} {
  const checked: string[] = []
  const unchecked: string[] = []
  const lines = prDescription.split('\n')
  const regex = /^- \[([xX ]*)\] (.*)$/
  for (const line of lines) {
    const match = line.match(regex)
    if (match) {
      const checkbox = match[1].trim()
      const text = match[2].trim()
      if (checkbox === 'x' || checkbox === 'X') {
        checked.push(text)
        core.info(`Found checked box: ${line}`)
      } else {
        unchecked.push(text)
        core.info(`Found unchecked box: ${line}`)
      }
    }
  }
  core.setOutput('checked', checked.join(','))
  core.setOutput('unchecked', unchecked.join(','))

  return {checked, unchecked}
}