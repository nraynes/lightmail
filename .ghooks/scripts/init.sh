ghook_scripts_dir="$(realpath "$(dirname "$0")")"
ghooks_main_path="$(dirname "$ghook_scripts_dir")"
ghooks_main_hooks_path="$ghooks_main_path/hooks"
main_project_path="$(dirname $ghooks_main_path)"
projects=("$(bash "$ghook_scripts_dir/getprojects.sh")")
echo
echo "Initializing GHook..." 
current_git_hooks_path="$(git config --get core.hooksPath)"
if [ "$current_git_hooks_path" != "$ghooks_main_path" ]; then
    echo "Setting git hook path..."
    git config core.hooksPath $ghooks_main_path
fi
echo
echo "Would you like to add a sub-project?"
while true; do
    select confirm in "yes" "no"; do
        if [ "$confirm" == "no" ]; then
            break 2
        else
            break
        fi
    done
    project_dirs=("$(find "$main_project_path" -mindepth 1 -maxdepth 1 -type d ! -name '.git' ! -name '.ghooks' ! -name '.' ! -name '..' -exec basename {} \;)")
    echo
    echo "Which directory would you like to set as a sub-project?"
    dir_selection=()
    for p in ${project_dirs[@]}; do
        if [[ ! "${projects[@]}" =~ "$p" ]]; then
            dir_selection+=($p)
        fi
    done
    if [ ${#dir_selection[@]} == 0 ]; then
        echo "No additional valid options for sub-projects."
        break
    fi
    select sub_project_directory in ${dir_selection[@]}; do
        projects+=($sub_project_directory)
        break
    done
    echo
    echo "Would you like to add another sub-project?"
done
echo
echo "Ensuring .ghooks hook path exists for sub-projects..."
for sub_project in ${projects[@]}; do
    sub_project_path="$main_project_path/$sub_project"
    if [ ! -d "$sub_project_path/.ghooks" ]; then
        echo "Creating .ghooks directory $sub_project_path in sub-project $sub_project..."
        mkdir -p "$sub_project_path/.ghooks"
    fi
    if [ ! -d "$sub_project_path/.ghooks/hooks" ]; then
        echo "Creating hooks directory $sub_project_path/.ghooks in sub-project $sub_project..."
        mkdir -p "$sub_project_path/.ghooks/hooks"
    fi
done
echo
echo "Ensuring all main hooks are present in sub-projects..."
main_hooks=("$(ls -F "$ghooks_main_hooks_path")")
for sub_project in ${projects[@]}; do
    sub_project_hooks_path="$main_project_path/$sub_project/.ghooks/hooks"
    for hook_file in ${main_hooks[@]}; do
        hook_file_path="$sub_project_hooks_path/$hook_file"
        if [ ! -f "$hook_file_path" ]; then
            echo "Creating $hook_file git hook in sub-project $sub_project..."
            touch "$hook_file_path"
        fi
    done
done
