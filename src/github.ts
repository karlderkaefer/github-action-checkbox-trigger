import {GitHub} from '@actions/github/lib/utils'
import {Context} from '@actions/github/lib/context'
import * as core from '@actions/core'
import * as github from '@actions/github'

export async function updatePrDescription(
  octokit: InstanceType<typeof GitHub>,
  context: Context,
  newDescription: string
): Promise<void> {
  if (!context.payload.pull_request) {
    throw new Error('No pull request found.')
  }
  await octokit.rest.pulls.update({
    ...context.repo,
    pull_number: context.payload.pull_request.number,
    body: newDescription
  })
}

export async function getLatestPullRequestDescription(): Promise<string> {
  const octokit = github.getOctokit(core.getInput('github-token'))
  const {owner, repo, number} = github.context.issue
  const {data: pullRequest} = await octokit.rest.pulls.get({
    owner,
    repo,
    pull_number: number
  })
  return pullRequest.body || ''
}
