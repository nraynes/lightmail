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
        assets: ["package.json", "CHANGELOG.md"],
      },
    ],
    [
      "@semantic-release/exec",
      {
        prepareCmd: "npm version --no-git-tag-version ${nextRelease.version}",
      },
    ],
    "@semantic-release/github",
  ],
};
