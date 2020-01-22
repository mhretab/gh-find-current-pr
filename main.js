const core = require('@actions/core');
const { GitHub, context } = require('@actions/github');

async function main() {
    const prNumber = context.payload.pull_request.number;
    const latestSha = context.payload.after;
    const branch = context.payload.pull_request.head.ref;
    
    console.log("prNumber", prNumber);
    console.log("payload", context.payload);
    console.log("latestSha", latestSha);
    console.log("branch", branch);
    const token = core.getInput('github-token', { required: true });
    console.log(`Hello ${token}!`);
    const sha = core.getInput('sha');
    console.log(`Hello sha ${token}!`);
    const client = new GitHub(token, {});
    const result = await client.repos.listPullRequestsAssociatedWithCommit({
        owner: context.repo.owner,
        repo: context.repo.repo,
        commit_sha: sha || context.sha,
    });

    const pr = result.data.length > 0 && result.data[0];
    console.log("Context", context.repo);
    console.log("pr", pr);
    console.log("branch", context.repo.branch);
    core.setOutput('pr', pr && pr.number || prNumber);
    core.setOutput('number', pr && pr.number || prNumber);
    core.setOutput('title', pr && pr.title || '');
    core.setOutput('body', pr && pr.body || '');
}

main().catch(err => core.setFailed(err.message));
