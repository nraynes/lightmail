altered_projects=("ui")

if [ "${#altered_projects[@]}" -eq "1" ]; then
    echo "Adding project scope to commit message..."
    scope="$altered_projects"
    commit_msg="feat(hello): this is a test

This is the body.

BREAKING CHANGE: This signifies a breaking change."
    header_prefix="$(echo $commit_msg | cut -d ':' -f 1 | cut -d ')' -f 1)"
    rest_of_message=${commit_msg:${#header_prefix}:$(( ${#commit_msg}-${#header_prefix} ))}
    IFS='('
    read -ra split_header_prefix <<< "$header_prefix"
    new_msg=""
    if [ "${#split_header_prefix[@]}" -eq "2" ]; then
        new_scope=""
        if [ "${split_header_prefix[1]}" != "" ]; then
            new_scope="$scope-${split_header_prefix[1]}"
        fi
        new_msg="${split_header_prefix[0]}($new_scope$rest_of_message"
    elif [ "${#split_header_prefix[@]}" -eq "1" ]; then
        new_msg="${split_header_prefix[0]}($scope)$rest_of_message"
    else
        echo "Could not parse commit message. Ensure you are using the conventional commits standard."
        exit 1
    fi
    echo "$new_msg"
fi