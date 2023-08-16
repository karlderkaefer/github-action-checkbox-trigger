import {checkCheckbox} from '../src/check'

describe('checkCheckbox', () => {
  it('checks the specified checkboxes', () => {
    const description = `
- [ ] option 1
- [ ] option 2
    `

    const result = checkCheckbox(description, ['option 1'])

    expect(result).toContain('- [x] option 1')
    expect(result).toContain('- [ ] option 2')
  })
})
