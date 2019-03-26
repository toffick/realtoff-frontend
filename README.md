# PixelPlex-app

PixelPlex React Redux app

## Getting started

### Installation

1. `cd web-ui` to go into the project root
1. `npm install` to install the website's npm dependencies

### Running locally

1. `npm start` to start the hot-reloading development server
1. `http://localhost:8080` to open the site in your favorite browser

### Build project
1. `npm run build` Build and put the project in a folder /dist

## Using STYLELINT

Settings IDE (vscode) 

Install plugins:

- **[stylelint](https://marketplace.visualstudio.com/items?itemName=shinnn.stylelint)**
- **[prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)**

user settings.json

    {
    	"[scss]": {
    		"editor.formatOnSave": true
    	},
    	"files.autoSave": "onFocusChange",
    	"prettier.stylelintIntegration": true,
    	"prettier.useTabs": true
    }
## Configure project for CI/CD

1. Change the `$DOCKER_REPOSITORY_URL` var in the `.gitlab-ci.yml` file
2. If is ECR used as docker repository, configure `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` vars in Settings->CI/CD->Variables
