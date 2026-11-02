# Contributions

This repository is open-source, and we welcome contributions from developers interested in our project. We appreciate bug fixes, new features, optimizations, and other enhancements. Before you begin contributing, please keep the following points in mind:

## What You Need to Know

- We are actively working on adding code linting, but it's not implemented yet.
- Refactoring efforts are ongoing. If you're interested in helping, check out the tasks listed [here](https://github.com/pocketnetteam/pocketnet.gui/issues/441).
- Some dependencies are not yet managed by NPM.
- While there's still work to be done, we ask contributors to adhere to the [Airbnb style guide](https://airbnb.io/javascript/) to keep the code as easy to understand as possible.

# Branches

- `master`: This branch contains stable code ready for release.
- `refactoring/*`: These branches are dedicated to code refactoring.
- `patch/*`: These branches are dedicated to patching current functionality.
- `feat/*`: These branches are dedicated to introducing new user-facing functionality.
- `hotfix/*`: These branches are dedicated to fixing urgent issues. Follow [SECURITY.md](https://github.com/pocketnetteam/pocketnet.gui/blob/master/SECURITY.md) to process security issues.
- `fix/*`: These branches are dedicated to fixing regular issues.
- `dependabot/*`: These branches are managed by Dependabot. Contributors can ignore them.

## Contribution Process

1. Fork our repository.
2. Identify what you want to add or change in the project.
3. Start a new issue describing the problem or enhancement you'd like to address, indicating your readiness to work on it.
4. Wait for feedback from the developers, who may provide additional information or guidance.
5. Create a separate branch for your task to keep things organized. Do not make changes directly to the `master` branch; instead, periodically synchronize your fork with the upstream repository.
6. Ensure your IDE or editor does not automatically format code styling, as we currently do not have a linter set up. Any unnecessary formatting changes could complicate the merge process.
7. Make your code changes, breaking them into logically coherent commits with descriptive titles and messages.
8. Verify that your code works. While testing on Cordova and Web builds is appreciated, testing on Electron is sufficient.
9. Provide a detailed description of your changes.
10. That's it! Now, wait for our developers to review your changes and merge the PR.
