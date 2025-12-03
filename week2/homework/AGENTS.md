# Agent Instructions for Git Workflow

This file contains instructions for AI agents to help with Git commands and version control workflow.

## Initial Setup

### Initialize Git Repository

```bash
git init
git add .
git commit -m "Initial commit: collaborative coding platform"
```

### Connect to Remote Repository

```bash
# Add remote origin
git remote add origin <your-github-repo-url>

# Push to main branch
git push -u origin main
```

## Regular Workflow

### Check Status

```bash
git status
```

### Stage Changes

```bash
# Stage all changes
git add .

# Stage specific file
git add <file-path>
```

### Commit Changes

```bash
# Commit with message (follow Conventional Commits)
git commit -m "feat: add real-time code collaboration"
git commit -m "fix: resolve WebSocket connection issues"
git commit -m "docs: update README with deployment instructions"
git commit -m "test: add integration tests for session management"
```

### Push Changes

```bash
# Push to main branch
git push origin main

# Force push (use carefully)
git push -f origin main
```

### Pull Latest Changes

```bash
# Pull from remote
git pull origin main

# Pull with rebase
git pull --rebase origin main
```

## Branching

### Create and Switch to New Branch

```bash
# Create and switch to feature branch
git checkout -b feature/code-execution

# Switch to existing branch
git checkout main
```

### Merge Branch

```bash
# Switch to main
git checkout main

# Merge feature branch
git merge feature/code-execution
```

### Delete Branch

```bash
# Delete local branch
git branch -d feature/code-execution

# Delete remote branch
git push origin --delete feature/code-execution
```

## Viewing History

### View Commit Log

```bash
# Full log
git log

# Condensed log
git log --oneline

# With graph
git log --graph --oneline --all
```

### View Differences

```bash
# See unstaged changes
git diff

# See staged changes
git diff --staged

# Compare branches
git diff main feature/code-execution
```

## Undoing Changes

### Discard Unstaged Changes

```bash
# Discard all unstaged changes
git checkout -- .

# Discard specific file
git checkout -- <file-path>
```

### Unstage Files

```bash
# Unstage all files
git reset HEAD

# Unstage specific file
git reset HEAD <file-path>
```

### Undo Last Commit (Keep Changes)

```bash
git reset --soft HEAD~1
```

### Undo Last Commit (Discard Changes)

```bash
git reset --hard HEAD~1
```

## Conventional Commits

Follow the Conventional Commits specification for commit messages:

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, etc.)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

### Examples

```bash
git commit -m "feat(editor): add syntax highlighting for Python"
git commit -m "fix(websocket): resolve connection timeout issue"
git commit -m "docs: add deployment guide for Render"
git commit -m "test(integration): add tests for code synchronization"
git commit -m "refactor(server): improve session management"
git commit -m "chore: update dependencies"
```

## Tagging Releases

### Create Tag

```bash
# Create annotated tag
git tag -a v1.0.0 -m "Release version 1.0.0"

# Push tag to remote
git push origin v1.0.0

# Push all tags
git push --tags
```

### List Tags

```bash
git tag
```

### Delete Tag

```bash
# Delete local tag
git tag -d v1.0.0

# Delete remote tag
git push origin --delete v1.0.0
```

## Stashing Changes

### Save Work in Progress

```bash
# Stash changes
git stash

# Stash with message
git stash save "WIP: implementing code execution"
```

### Apply Stashed Changes

```bash
# Apply most recent stash
git stash apply

# Apply specific stash
git stash apply stash@{0}

# Apply and remove stash
git stash pop
```

### View Stashes

```bash
git stash list
```

## Useful Aliases

Add these to your `.gitconfig`:

```bash
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual 'log --graph --oneline --all'
```

## GitHub Specific

### Create Pull Request

```bash
# Push feature branch
git push origin feature/new-feature

# Then create PR on GitHub UI
```

### Sync Fork

```bash
# Add upstream remote
git remote add upstream <original-repo-url>

# Fetch upstream changes
git fetch upstream

# Merge upstream changes
git merge upstream/main
```

## Troubleshooting

### Merge Conflicts

```bash
# View conflicted files
git status

# After resolving conflicts
git add .
git commit -m "chore: resolve merge conflicts"
```

### Large Files

```bash
# Use Git LFS for large files
git lfs install
git lfs track "*.db"
git add .gitattributes
```

## Best Practices

1. **Commit Often**: Make small, focused commits
2. **Write Clear Messages**: Follow Conventional Commits
3. **Pull Before Push**: Always pull latest changes first
4. **Use Branches**: Create feature branches for new work
5. **Review Changes**: Check `git diff` before committing
6. **Keep History Clean**: Use `git rebase` for cleaner history

## Quick Reference

```bash
# Stage, commit, and push in one go
git add . && git commit -m "feat: add new feature" && git push origin main

# Create branch, commit, and push
git checkout -b feature/new-feature && git add . && git commit -m "feat: implement feature" && git push -u origin feature/new-feature

# Update from main
git checkout main && git pull && git checkout feature/new-feature && git merge main
```
