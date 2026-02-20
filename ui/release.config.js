export default {
  branches: ["main"],
  tagFormat: "v${version}-ui",
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        releaseRules: [
          {
            header: "^\\[.*ui:?.*\\] (feat):",
            release: "minor",
          },
          {
            header: "^\\[.*ui:?.*\\] (fix):",
            release: "patch",
          },
          {
            type: "breaking",
            header: "^\\[.*ui:?.*\\].*(BREAKING CHANGE):",
            release: "major",
          },
        ],
        ignoreDefaultRules: true,
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
