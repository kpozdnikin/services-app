# README #

This README would normally document whatever steps are necessary to get your application up and running.

### What is this repository for? ###

* Services
* Version 0.1.0

### How do I get set up? ###

* Create `.env.local` file with kind of content:
```
PUBLIC_API_URL=https://api-staging-1.getsquire.com
PUBLIC_APP_ROOT_ID=services-app-root
PUBLIC_DEPLOYMENT_ENV=local
PUBLIC_DEPLOYMENT_URL=http://localhost
PUBLIC_PORT=3005
FEDERATED=true
```


### Branch names
Branch names have to represent ticket types they are created for and include a ticket number.
If you work on something out of JIRA, create a JIRA ticket to track that.
```
bug/WTR-321 – for a regular JIRA bug ticket
hotfix/WTR-321 – for a JIRA bug ticket that is marked a hotfix
task/WTR-123 – for the JIRA task and subtask tickets
story/WTR-42 – for the JIRA stories
epic/WTR-54 – for the JIRA epics
```

Following branch name convention makes it easy to find any branch and groups them by type.

### Branching model
The general rule is **one ticket – one branch**.
Don't include any unrelated changes into a single branch.
Always start a new branch from a root branch, so it doesn't have any unrelated changes.

We're operating with the following set of branches:

- `main`.
  The main branch that represents what we can on production.
  Each new branch should be based on master unless there are some dependencies from other branches.
  In that case a new branch is created from the base branch.
- Feature/bug branch(`task/SQR-77`/`bug/SQR-77`).
  Represents a single ticket and always starts from a sprint branch.
  Once completed, it gets merged back into the sprint branch through a PR.
  If a feature/bug branch requires any changes from another feature/bug branch that is not merged into a sprint branch yet, one feature branch can be merged into another one directly.
- Hotfix(`hotfix/SQR-42`)
  Mark something that needs to be fixed on production as soon as possible.
  This kind of branches has to be created only from master.
  Once an issue is solved, it gets merged into `staging` for feature and regression testing.
  If tests pass, the ticket goes directly to `master`.


These rules help keeping the repository clean, make it easy to code review stuff and track changes.

### Commit messages
We use the following commit message convention:

```
[{TICKET_NUMBER}] Capitalized commit message
```

Examples:
```
[SA-42] Fix a bug
[WTR-99] Update project dependencies
[IN-999] Add new functionality
```

There are also some allowed non-standard commit messages: `WIP` and those that start with `Merge` or `Revert`:
```
WIP
Revert "[WTR-99] Update project dependencies (pull request #42)"
Reverted "[WTR-99] Update project dependencies (pull request #42)"
Merged in bug/WTR-6961 (pull request #3799)
Merge in bug/WTR-6961 (pull request #3799)
```

Standardized commit messages make the commit history clean and highly searchable.

### Code reviews
Any code must be code-reviewed before getting to the `main` branch.

Pull requests must contain as little changes as possible. Only one ticket should be included into a PR.
This rule can be violated in the following cases:
- Changes that need to be applied rely on another changes that are not merged yet
- The same code change fixes multiple tickets
- You are merging an epic – this way you can merge a group of related changes

### Deployments
Deployed to QA as a part of Commander
