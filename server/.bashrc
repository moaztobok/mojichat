npm-with-types() {
  npm install "$@" && npm install --save-dev $(npm list --depth=0 --json | jq -r '.dependencies | keys[]' | grep -v "@types/" | sed 's/^/@types\//')
}
alias npmt="npm-with-types"
