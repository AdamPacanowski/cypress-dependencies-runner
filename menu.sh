# Bash Menu Script Example

options=("Console 1 (ts watch)" "Console 2 (jest tests)" "Console 3 (test server)" "Quit")
select opt in "${options[@]}"
do
    case $opt in
        "Console 1 (ts watch)")
            npm run watch
            break
            ;;
        "Console 2 (jest tests)")
            npm test
            break
            ;;
        "Console 3 (test server)")
            cd testserver
            npm start
            break
            ;;
        "Quit")
            break
            ;;
        *) echo "invalid option $REPLY";;
    esac
done