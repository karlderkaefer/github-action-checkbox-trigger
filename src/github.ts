import {GitHub} from '@actions/github/lib/utils'
import * as core from '@actions/core'
import * as github from '@actions/github'

export async function updatePrDescription(
  octokit: InstanceType<typeof GitHub>,
  newDescription: string
): Promise<void> {
  const issue = github.context.issue
  if (!issue || !issue.owner || !issue.repo || !issue.number) {
    core.error(`No pull request found: ${JSON.stringify(issue)}`)
  }
  try {
    const {owner, repo, number} = issue
    await octokit.rest.pulls.update({
      owner,
      repo,
      pull_number: number,
      body: newDescription
    })
  } catch (error) {
    core.error(`Error on updating PR description: ${error}`)
  }
}

export async function getLatestPullRequestDescription(
  octokit: InstanceType<typeof GitHub>
): Promise<string> {
  const issue = github.context.issue
  if (!issue || !issue.owner || !issue.repo || !issue.number) {
    core.error(`Invalid issue object: ${JSON.stringify(issue)}`)
    return ''
  }
  try {
    const {owner, repo, number} = github.context.issue
    const {data: pullRequest} = await octokit.rest.pulls.get({
      owner,
      repo,
      pull_number: number
    })
    return pullRequest.body || ''
  } catch (error) {
    core.error(`Error on getting PR description: ${error}`)
    return ''
  }
}
