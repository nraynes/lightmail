# Extended Conventional Commits 1.0.0

commit_message="$1"
projects="$(echo "$2" | sed 's/ /|/g')"
echo $projects
echo $commit_message

# Do not run for merges or reverts.
rule_github_merges_ok="hello"
if [[ "$commit_message" =~ $rule_github_merges_ok ]]; then
    echo "Merge/Revert detected. Skipping commit-msg hook..."
    exit 1
fi

# Rule (EXTENSION): Ensure sub-project label matches available project.
if [[ ! "$commit_message" =~ "" ]]; then
    echo "Merge/Revert detected. Skipping commit-msg hook..."
    exit 1
fi
echo "Exiting commit"
exit 1
