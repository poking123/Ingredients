# HEROKU 
# Configure the Heroku provider
provider "heroku" {
    email = "dushen1321@gmail.com"
    api_key = var.heroku_api_key
}

# Create a new application
resource "heroku_app" "default" {
    name    = "let-s-goooooo"
    region  = "us"
}

# config/environment variables
resource "heroku_config" "default" {
    vars = {
        x = "https://..."
        y = "https://..."
        z = "https://..."
    }

    sensitive_vars = {
        PRIVATE_KEY = "some_private_key"
    }
}

resource "heroku_app_config_association" "default" {
  app_id = "${heroku_app.default.id}"

  vars = "${heroku_config.default.vars}"
  sensitive_vars = "${heroku_config.default.sensitive_vars}"
}

# resource "heroku_build" "default" {
#   app = "${heroku_app.default.id}"

#   source = {
#     # A local directory, changing its contents will
#     # force a new build during `terraform apply`
#     path = "./"
#   }
# }

# NETLIFY
# Configure the Netlify Provider
provider "netlify" {
  token    = "${var.netlify_token}"
  base_url = "${var.netlify_base_url}"
}

# Create a new deploy key for this specific website
resource "netlify_deploy_key" "key" {}

# Define your site
resource "netlify_site" "default" {
  name = "ingredientstracker"

  repo {
    repo_branch   = "master"
    command       = "npm i --prefix client && npm run build --prefix client"
    deploy_key_id = "${netlify_deploy_key.key.id}"
    dir           = "client/build"
    provider      = "github"
    repo_path     = "poking123/Ingredients"
  }
}

