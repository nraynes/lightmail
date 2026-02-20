# Extended Conventional Commits 1.0.0

commit_message="$1"
projects="$2" | sed 's/ /|/g'
echo $projects

# Do not run for merges or reverts.
if [[ $commit_message =~ "^(Merge|Revert)" ]]; then
    echo "Merge/Revert detected. Skipping commit-msg hook..."
    exit 0
fi

# Rule (EXTENSION): Ensure sub-project label matches available project.
if [[ ! $commit_message =~ "" ]]; then
    echo "Merge/Revert detected. Skipping commit-msg hook..."
    exit 1
fi
echo "Exiting commit"
exit 1
