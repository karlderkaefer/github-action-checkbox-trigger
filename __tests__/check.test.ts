import { modifyCheckboxes, CheckboxAction} from '../src/check'

describe('modifyCheckboxes', () => {
  it('checks a single unchecked checkbox', () => {
    const description = `
- [ ] Option 1
- [ ] Option 2
    `

    const result = modifyCheckboxes(description, ['Option 1'], CheckboxAction.Check)

    expect(result).toContain('- [x] Option 1')
    expect(result).toContain('- [ ] Option 2')
  })

  it('checks multiple unchecked checkboxes', () => {
    const description = `
- [ ] Option 1
- [ ] Option 2
- [ ] Option 3
    `

    const result = modifyCheckboxes(description, ['Option 1', 'Option 3'], CheckboxAction.Check)

    expect(result).toContain('- [x] Option 1')
    expect(result).toContain('- [ ] Option 2')
    expect(result).toContain('- [x] Option 3')
  })

  it('does not modify the description if no checkboxes are specified', () => {
    const description = `
- [ ] Option 1
- [ ] Option 2
    `

    const result = modifyCheckboxes(description, [], CheckboxAction.Check)

    expect(result).toEqual(description)
  })

  it('does not modify the description if the specified checkboxes are already checked', () => {
    const description = `
- [x] Option 1
- [ ] Option 2
    `

    const result = modifyCheckboxes(description, ['Option 1'], CheckboxAction.Check)

    expect(result).toEqual(description)
  })

  it('does not modify the description if the specified checkboxes are not found', () => {
    const description = `
- [ ] Option 1
- [ ] Option 2
    `

    const result = modifyCheckboxes(description, ['Option 3'], CheckboxAction.Check)

    expect(result).toEqual(description)
  })

  it('checks a checkbox with leading/trailing whitespace', () => {
    const description = `
  - [x] Option 1   ···
  - [ ] Option 2
    `
  
    const result = modifyCheckboxes(description, ['Option 1'], CheckboxAction.Check)
  
    expect(result).toContain('- [x] Option 1   ')
    expect(result).toContain('- [ ] Option 2')
  })

  it('checks a checkbox with n number of spaces within the brackets', () => {
    const description = `
- [ ] Option 1
- [] Option 2
    `

    const result = modifyCheckboxes(description, ['Option 2'], CheckboxAction.Check)
  
    expect(result).toContain('- [ ] Option 1')
    expect(result).toContain('- [x] Option 2')
  })

  it('checks a checkbox with uppercase "X"', () => {
    const description = `
- [ ] Option 1
- [ ] Option 2
    `

    const result = modifyCheckboxes(description, ['Option 1'], CheckboxAction.Check)

    expect(result).toContain('- [x] Option 1')
    expect(result).toContain('- [ ] Option 2')
  })

  it('checks a checkbox with lowercase "x"', () => {
    const description = `
- [ ] Option 1
- [ ] Option 2
    `

    const result = modifyCheckboxes(description, ['Option 1'], CheckboxAction.Check)

    expect(result).toContain('- [x] Option 1')
    expect(result).toContain('- [ ] Option 2')
  })
})