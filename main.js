const core = require('@actions/core');
const { GitHub, context } = require('@actions/github');

async function main() {
    console.log(`Hello ${token}!`);
    const token = core.getInput('github-token', { required: true });
    const sha = core.getInput('sha');

    const client = new GitHub(token, {});
    const result = await client.repos.listPullRequestsAssociatedWithCommit({
        owner: context.repo.owner,
        repo: context.repo.repo,
        commit_sha: sha || context.sha,
    });

    const pr = result.data.length > 0 && result.data[0];
    console.log("Context", context.repo);
    core.setOutput('pr', pr && pr.number || '');
    core.setOutput('number', pr && pr.number || '');
    core.setOutput('title', pr && pr.title || '');
    core.setOutput('body', pr && pr.body || '');
}

main().catch(err => core.setFailed(err.message));
