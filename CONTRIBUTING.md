# Contributing to Rentaly

Thanks for your interest in contributing.

## Ground Rules

- Be respectful and constructive in discussions and reviews.
- Keep changes scoped and easy to review.
- Prefer small pull requests over large multi-purpose ones.

## License Terms for Contributions

This repository uses a custom license in [LICENSE](LICENSE) with three key conditions:

- Non-commercial use only
- No AI/ML training or model development use
- Required attribution to Alex Bessedonato

By submitting code to this repository, you agree your contribution is licensed under the same terms.

## Development Workflow

1. Fork the repository.
2. Create a feature branch.
3. Run checks locally before opening a pull request:

```bash
pnpm run lint
pnpm run build
```

4. Open a PR with:

- clear summary of what changed
- why the change is needed
- screenshots for UI changes (if applicable)

## Pull Request Checklist

- Code is readable and focused.
- No unrelated refactors in the same PR.
- Lint and build pass locally.
- Any behavior changes are documented in the PR description.
