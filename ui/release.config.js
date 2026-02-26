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
        preset: "conventionalcommits",
        presetConfig: {
          types: [
            { type: "feat", section: "Features", hidden: false },
            { type: "fix", section: "Bug Fixes", hidden: false },
            { type: "docs", section: "Miscellaneous Chores", hidden: false },
            { type: "chore", section: "Miscellaneous Chores", hidden: false },
          ],
        },
        parserOpts: {
          noteKeywords: ["BREAKING CHANGE", "BREAKING CHANGES", "BREAKING"],
          headerPattern: /^(\w*)(?:\(auth-?\w*\))?: (.*)$/,
        },
      },
    ],
    [
      "@semantic-release/changelog",
      {
        changelogFile: "CHANGELOG.md",
      },
    ],
    [
      "@semantic-release/npm",
      {
        npmPublish: false,
      },
    ],
    [
      "@semantic-release/git",
      {
        tag: "v${nextRelease.version}-ui",
        assets: ["package.json", "CHANGELOG.md"],
      },
    ],
    "@semantic-release/github",
  ],
};
