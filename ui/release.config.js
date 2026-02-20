export default {
  branches: ["main"],
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        releaseRules: [
          {
            type: "feat",
            release: "minor",
            commitMessage: "^\\[.*ui:?.*\\] (feat):",
          },
          {
            type: "fix",
            release: "patch",
            commitMessage: "^\\[.*ui:?.*\\] (fix):",
          },
          {
            type: "breaking",
            release: "major",
            commitMessage: "^\\[.*ui:?.*\\].*(BREAKING CHANGE):",
          },
        ],
      },
    ],
    [
      "@semantic-release/release-notes-generator",
      {
        writerOpts: {
          file: "ui/CHANGELOG.md",
        },
      },
    ],
    [
      "@semantic-release/git",
      {
        tag: "v${nextRelease.version}-ui",
      },
    ],
    [
      "@semantic-release/exec",
      {
        prepareCmd:
          "cd ui && npm version --no-git-tag-version ${nextRelease.version} && cd ..",
      },
    ],
    "@semantic-release/github",
  ],
};
