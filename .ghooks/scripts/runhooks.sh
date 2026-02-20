ghook_scripts_dir="$(realpath "$(dirname "$0")")"
ghooks_main_path="$(dirname "$ghook_scripts_dir")"
main_project_path="$(dirname $ghooks_main_path)"
staged=("$(git diff --name-only --cached)")
hook="$1"

echo "Running monorepo commit hook $hook..."

sub_projects_changed=("$(bash "$ghook_scripts_dir/alteredprojects.sh")")

for sub_project in ${sub_projects_changed[@]}; do
    if [ -f "$main_project_path/$sub_project/.ghooks/hooks/$hook" ]; then
        echo "Running $hook for sub-project $sub_project..."
        cd "$main_project_path/$sub_project"
        bash "$main_project_path/$sub_project/.ghooks/hooks/$hook"
    fi
done
