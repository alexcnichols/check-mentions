const core = require('@actions/core');
const github = require('@actions/github');
const parseComment = require('./parse-comment');

async function run() {
  try {
    // Get authenticated GitHub client (Ocktokit): https://github.com/actions/toolkit/tree/master/packages/github#usage
    const client = new github.GitHub(process.env.GITHUB_TOKEN);
    const owner = client.context.owner; 
    const repo = client.context.repo; 
    const actor = client.context.actor;
    const comment = client.context.payload.comment;

    core.debug("Owner: " & owner);
    core.debug("Repo: " & repo);
    core.debug("Actor: " & actor);

    // Get mentioned user(s)
    const mentionedUsers = await parseComment(comment);

    core.debug("Mentioned users: " & mentionedUsers);

    // ONLY SUPPORTS FIRST MENTION
    const mentionedUsername = mentionedUsers[0];

    // Does the mentioned user already have access to the repository either directly or through a team membership?
    const isCollaborator = client.repos.checkCollaborator({
      owner,
      repo,
      mentionedUsername
    });

    core.debug("Is collaborator: " & isCollaborator);

    // Is the repository an individual or organization repo?
    const isOrgOwned = client.repos.get({
      owner,
      repo
    }).type === 'User' ? false : true;

    core.debug("Is org owned: " & isOrgOwned);

    // For org, is the mentioned user already a member of the organization?
    if (isOrgOwned) {
      const org = owner;

      const isOrgMember = client.orgs.checkMembership({
        org,
        mentionedUsername
      });

      core.debug("Is org member: " & isOrgMember);
    }
  } 
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
