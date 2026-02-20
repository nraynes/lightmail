# Path variables.
ghook_scripts_dir="$(realpath "$(dirname "$0")")"
ghooks_main_path="$(dirname "$ghook_scripts_dir")"
main_project_path="$(dirname $ghooks_main_path)"

# Get directories in project.
project_dirs=("$(ls -a "$main_project_path")")

# Get sub-project directories.
sub_project_dirs=()
for d in ${project_dirs[@]}; do
    if [ -d "$main_project_path/$d" ] && [ $d != '.' ] && [ $d != '.ghooks' ]; then
        if [ -d "$main_project_path/$d/.ghooks" ]; then
            sub_project_dirs+=("$d")
        fi
    fi
done

# Output list of sub-projects.
echo "${sub_project_dirs[@]}"
