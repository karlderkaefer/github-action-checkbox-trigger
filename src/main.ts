import * as core from '@actions/core'
import * as github from '@actions/github'
import {detectCheckboxes} from './detect'
import {modifyCheckboxes, CheckboxAction} from './check'
import {updatePrDescription, getLatestPullRequestDescription} from './github'

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

    const prDescription: string = await getLatestPullRequestDescription()

    switch (action) {
      case 'detect':
        detectCheckboxes(prDescription)
        break
      case 'check': {
        const checkedDescription = modifyCheckboxes(
          prDescription,
          checkbox.split(','),
          CheckboxAction.Check
        )
        await updatePrDescription(octokit, context, checkedDescription)
        break
      }
      case 'uncheck': {
        const uncheckedDescription = modifyCheckboxes(
          prDescription,
          checkbox.split(','),
          CheckboxAction.Uncheck
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
