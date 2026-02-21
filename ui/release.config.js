export default {
  branches: ["main"],
  tagFormat: "v${version}-ui",
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        releaseRules: [
          {
            type: "feat",
            scope: "^ui(-.*)?",
            release: "minor",
          },
          {
            type: "fix",
            scope: "^ui(-.*)?",
            release: "patch",
          },
          {
            type: "breaking",
            scope: "^ui(-.*)?",
            release: "major",
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
