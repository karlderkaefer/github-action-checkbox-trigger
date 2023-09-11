import * as core from '@actions/core'
import * as github from '@actions/github'
import {detectCheckboxes} from './detect'
import {modifyCheckboxes} from './check'
import {CheckboxActionType} from './model'
import {updatePrDescription} from './github'

async function run(): Promise<void> {
  try {
    const token: string = core.getInput('github-token', {required: true})
    const action: string = core.getInput('action')
    const checkbox: string = core.getInput('checkbox')
    const octokit = github.getOctokit(token)
    const context = github.context
    const pullRequest = context.payload.pull_request

    if (!pullRequest || !pullRequest.body) {
      core.warning('No pull request found. Skipping.')
      return
    }

    const prDescription: string = pullRequest.body

    switch (action) {
      case 'detect':
        detectCheckboxes(prDescription)
        break
      case 'check': {
        const checkedDescription = modifyCheckboxes(
          prDescription,
          checkbox.split(','),
          CheckboxActionType.Check
        )
        await updatePrDescription(octokit, context, checkedDescription)
        break
      }
      case 'uncheck': {
        const uncheckedDescription = modifyCheckboxes(
          prDescription,
          checkbox.split(','),
          CheckboxActionType.Uncheck
        )
        await updatePrDescription(octokit, context, uncheckedDescription)
        break
      }
      default:
        core.setFailed(`Invalid action: ${action}`)
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
