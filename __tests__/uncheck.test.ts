import {uncheckCheckbox} from '../src/uncheck'

describe('uncheckCheckbox', () => {
  it('unchecks the specified checkboxes', () => {
    const description = `
- [x] option 1
- [x] option 2
    `

    const result = uncheckCheckbox(description, ['option 1'])

    expect(result).toContain('- [ ] option 1')
    expect(result).toContain('- [x] option 2')
  })
})
