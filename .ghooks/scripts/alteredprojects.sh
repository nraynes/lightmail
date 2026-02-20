ghook_scripts_dir="$(realpath "$(dirname "$0")")"
projects=("$(bash "$ghook_scripts_dir/getprojects.sh")")
staged=("$(git diff --name-only --cached)")

sub_projects_changed=()

for item in ${staged[@]}; do
    staged_root="$(echo "$item" | cut -d '/' -f 1)"
    if [[ ${projects[@]} =~ $staged_root ]] && [[ ! ${sub_projects_changed[@]} =~ $staged_root ]]; then
        sub_projects_changed+=($staged_root)
    fi
done

echo "${sub_projects_changed[@]}"
