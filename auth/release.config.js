export default {
  branches: ["main"],
  tagFormat: "v${version}-auth",
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        releaseRules: [
          {
            type: "feat",
            scope: "^auth(-.*)?",
            release: "minor",
          },
          {
            type: "fix",
            scope: "^auth(-.*)?",
            release: "patch",
          },
          {
            type: "breaking",
            scope: "^auth(-.*)?",
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
          headerPattern: /^(\w*)(?:\(auth-?\w*\))?\: (.*)$/
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
      "@semantic-release/exec",
      {
        prepareCmd: "cargo install cargo-edit && cargo set-version ${nextRelease.version}"
      }
    ],
    [
      "@semantic-release/git",
      {
        tag: "v${nextRelease.version}-auth",
        assets: ["Cargo.lock", "Cargo.toml", "CHANGELOG.md"],
      },
    ],
    "@semantic-release/github",
  ],
};
