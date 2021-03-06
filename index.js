const core = require('@actions/core');
const { GitHub, context } = require('@actions/github');
const parseComment = require('./parse-comment');

async function run() {
  try {
    // Get authenticated GitHub client (Ocktokit) and other context
    const github = new GitHub(process.env.GITHUB_TOKEN);
    const { owner, repo } = context.repo;
    const actor = context.actor;
    const comment = context.payload.comment;

    core.debug("Event name: " + context.eventName);
    core.debug("Workflow: " + context.workflow);
    core.debug("Action: " + context.action);
    core.debug("Owner: " + owner);
    core.debug("Repo: " + repo);
    core.debug("Actor: " + actor);

    // Check if issue_comment event
    if (context.eventName === 'issue_comment') {
      core.debug("Valid event: " + context.eventName);
    } else {
      core.debug("Invalid event: " + context.eventName);
      return;
    }

    // Check is a comment exists
    if (comment && comment.body) {
      var commentDebug = comment.body.length > 18 ? "Comment (beginning): " + comment.body.substr(0, 15) + "..." : "Comment (beginning): " + comment.body
      core.debug(commentDebug);
    } else {
      core.debug("Comment is empty. Returning.");
      return;
    }

    // Get mentioned user(s)
    const mentionedUsers = await parseComment(comment.body);

    // ONLY SUPPORTS FIRST MENTION
    // TODO: Handle multiple people mentioned
    // TODO: Handle when the same person was mentioned more than once
    if (mentionedUsers && mentionedUsers.length) {
      core.debug("Mentioned user count: " + mentionedUsers.length);
      core.debug("Mentioned users: " + mentionedUsers);
    } else {
      core.debug("No mentioned users. Returning.");
      return;
    }
    const mentionedUsername = mentionedUsers[0];
    core.debug("Mentioned username: "+ mentionedUsername);

    // Does the mentioned user already have access to the repository either directly or through a team membership?
    core.debug(await github.repos.checkCollaborator({
      owner,
      repo,
      mentionedUsername
    }).status);
    core.debug(await github.repos.checkCollaborator({
      owner,
      repo,
      mentionedUsername
    }).keys);
    const isCollaborator = await github.repos.checkCollaborator({
      owner,
      repo,
      mentionedUsername
    }).status === 204 ? true : false;

    core.debug("Is collaborator: " + isCollaborator);

    // Is the repository an individual or organization repo?
    core.debug(await github.repos.get({
      owner,
      repo
    }).type);
    const isOrgOwned = await github.repos.get({
      owner,
      repo
    }).type === 'User' ? false : true;

    core.debug("Is org owned: " + isOrgOwned);

    // TODO
    return;
    // For org, is the mentioned user already a member of the organization?
    if (isOrgOwned) {
      // Get elevated personally authenticated GitHub client (Ocktokit)
      const githubElevated = new GitHub(process.env.GITHUB_PERSONAL_TOKEN_ORG_READ);
      const org = owner;

      const isOrgMember = await githubElevated.orgs.checkMembership({
        org,
        mentionedUsername
      });

      core.debug("Is org member: " + isOrgMember);
    }

    // Depending on the situation, draft a comment with appropriate wording
    // TODO

    // Create comment
    // TODO
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
