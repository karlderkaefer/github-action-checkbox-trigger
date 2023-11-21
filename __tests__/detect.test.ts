import {detectCheckboxes} from '../src/detect'

describe('detectCheckboxes', () => {
  it('detects checked and unchecked checkboxes correctly', () => {
    const description = `
- [x] option 1
- [ ] option 2
- [x] option 3
    `

    const {checked, unchecked} = detectCheckboxes(description)

    expect(checked).toEqual(['option 1', 'option 3'])
    expect(unchecked).toEqual(['option 2'])
  })
})
