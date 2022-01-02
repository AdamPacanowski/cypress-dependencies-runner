#!/bin/bash


# https://rimuhosting.com/knowledgebase/linux/misc/trapping-ctrl-c-in-bash
trap ctrl_c INT

function ctrl_c() {
  exec bash;
}

# https://stackoverflow.com/questions/33286740/how-to-enter-text-at-command-prompt-from-shell-script-without-executing-command/33287211
read -e -p "(Control-C to cancel) $ " -i "npm run watch" && eval "$REPLY" && exec bash; 