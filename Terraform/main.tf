provider "heroku" {
    version = "~> 2.0"
}

# Configure the Heroku provider
provider "heroku" {
    email   = "dushen1321@gmail.com"
    api_key = var.heroku_api_key
}

# Create a new application
resource "heroku_app" "default" {
    name   = "let-s-goooooo"
    region = "us"
    giturl = "https://github.com/poking123/Ingredients"
}