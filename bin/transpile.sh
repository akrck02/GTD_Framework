
# Parse the watch flag.
while getopts w flag
do
    case "${flag}" in
        w) tsc -w;;&
    esac
done

## Execute the tsc command.
tsc
