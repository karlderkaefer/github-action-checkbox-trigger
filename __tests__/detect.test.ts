import {detectCheckboxes} from '../src/detect'

describe('detectCheckboxes', () => {
  it('detects a single checked checkbox', () => {
    const description = `
- [x] Option 1
- [ ] Option 2
    `

    const result = detectCheckboxes(description)

    expect(result.checked).toEqual(['Option 1'])
    expect(result.unchecked).toEqual(['Option 2'])
  })

  it('detects multiple checked checkboxes', () => {
    const description = `
- [x] Option 1
- [ ] Option 2
- [x] Option 3
    `

    const result = detectCheckboxes(description)

    expect(result.checked).toEqual(['Option 1', 'Option 3'])
    expect(result.unchecked).toEqual(['Option 2'])
  })

  it('detects checkboxes with different capitalization', () => {
    const description = `
- [x] Option 1
- [ ] option 2
    `

    const result = detectCheckboxes(description)

    expect(result.checked).toEqual(['Option 1'])
    expect(result.unchecked).toEqual(['option 2'])
  })

  it('detects checkboxes with leading/trailing whitespace', () => {
    const description = `
- [x]   Option 1   
- [ ] Option 2
    `

    const result = detectCheckboxes(description)

    expect(result.checked).toEqual(['Option 1'])
    expect(result.unchecked).toEqual(['Option 2'])
  })

  it('detects checkboxes with n number of spaces within the brackets', () => {
    const description = `
- [x] Option 1
- [] Option 2
    `

    const result = detectCheckboxes(description)

    expect(result.checked).toEqual(['Option 1'])
    expect(result.unchecked).toEqual(['Option 2'])
  })

  it('detects checkboxes with uppercase "X"', () => {
    const description = `
- [X] Option 1
- [ ] Option 2
    `

    const result = detectCheckboxes(description)

    expect(result.checked).toEqual(['Option 1'])
    expect(result.unchecked).toEqual(['Option 2'])
  })

  it('detects checkboxes with lowercase "x"', () => {
    const description = `
- [x] Option 1
- [ ] Option 2
    `

    const result = detectCheckboxes(description)

    expect(result.checked).toEqual(['Option 1'])
    expect(result.unchecked).toEqual(['Option 2'])
  })

  it('returns empty arrays if no checkboxes are found', () => {
    const description = `
This is a description with no checkboxes.
    `

    const result = detectCheckboxes(description)

    expect(result.checked).toEqual([])
    expect(result.unchecked).toEqual([])
  })

  it('sutom', () => {
    const description = `
## Description

Please include a summary of the changes and the related issue. Please also include relevant motivation and context. List any dependencies that are required for this change.

Fixes # (issue)

## Testing

To re-run the tests, click the checkbox Trigger the integration test below. Once the test is successful, the checkbox Integration test succeeded will be checked.

- [x] Trigger the integration test
- [ ] Integration test succeeded
`

    const result = detectCheckboxes(description)

    expect(result.checked).toEqual(["Trigger the integration test"])
    expect(result.unchecked).toEqual(["Integration test succeeded"])
  })
})