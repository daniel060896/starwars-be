# Star Wars API

Welcome to the Star Wars API project!Below, you will find instructions on how to set up and run the project.

## Prerequisites

Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your machine.

## Installation

Follow these steps to set up the project in your local environment:

1. **Install dependencies:**

   ```bash
   npm ci
   ```

2. **Configure environment variables:**<br/>
   Copy the sample environment variables file:

   ```bash
   cp .env.sample .env
   ```

3. **Start the application:**<br/>
   Run the following command to start the server:

   ```bash
   npm start
   ```

## Development Environment Setup

To configure the development environment, follow these steps:

1. **Set up linters:**<br/>
   Copy the Visual Studio Code settings configuration:

   ```bash
   cp .vscode/settings.json.sample .vscode/settings.json
   ```

2. **Recomended Extensions:**<br/>
   To enhance your development experience, it is recommended to install the following Visual Studio Code extensions:
   - Prettier - Code formatter: `esbenp.prettier-vscode`
   - ESLint: `dbaeumer.vscode-eslint`

## Testing

To run the project's tests, use the following command:

```bash
npm test
```
