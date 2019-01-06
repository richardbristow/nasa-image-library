workflow "Build and deploy on push" {
  on = "push"
  resolves = ["GitHub Action for npm"]
}

action "GitHub Action for npm" {
  uses = "actions/npm@e7aaefe"
  args = "yarn"
}
