const core = require('@actions/core');
const { GitHub, context } = require('@actions/github');

async function main() {
    let prNumber, currentBranch;
    let latestSha = context.payload.after;

    if (context.payload.pull_request) {
        prNumber = context.payload.pull_request.number;
        currentBranch = context.payload.pull_request.head.ref;
    } else {
        prNumber = '';
        currentBranch = context.payload.ref.split('refs/heads/')[0];
    }

    if(!prNumber && branches.includes(currentBranch)) {
        core.setOutput("deployID", "")
    } else {
        core.setOutput("deployID", `/${prNumber || latestSha}`);
    }

    console.log("prNumber", prNumber);
    console.log("latestSha", latestSha);
    console.log("branch", currentBranch);

    core.setOutput('pr', prNumber);
    core.setOutput('branch', currentBranch);
    core.setOutput('latestSha', latestSha);
}

main().catch(err => core.setFailed(err.message));
