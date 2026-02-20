ghook_scripts_dir="$(realpath "$(dirname "$0")")"
ghooks_main_path="$(dirname "$ghook_scripts_dir")"
main_project_path="$(dirname $ghooks_main_path)"
projects=("$(bash "$ghook_scripts_dir/getprojects.sh")")
staged=("$(git diff --name-only --cached)")
hook="$1"

echo "Running monorepo commit hook $hook..."

sub_projects_changed=()

for item in ${staged[@]}; do
    staged_root="$(echo "$item" | cut -d '/' -f 1)"
    if [[ ${projects[@]} =~ $staged_root ]] && [[ ! ${sub_projects_changed[@]} =~ $staged_root ]]; then
        sub_projects_changed+=($staged_root)
    fi
done

for sub_project in ${sub_projects_changed[@]}; do
    if [ -f "$main_project_path/$sub_project/.ghooks/hooks/$hook" ]; then
        echo "Running $hook for sub-project $sub_project..."
        cd "$main_project_path/$sub_project"
        bash "$main_project_path/$sub_project/.ghooks/hooks/$hook"
    fi
done
