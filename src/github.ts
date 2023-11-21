import {GitHub} from '@actions/github/lib/utils'
import {Context} from '@actions/github/lib/context'

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
