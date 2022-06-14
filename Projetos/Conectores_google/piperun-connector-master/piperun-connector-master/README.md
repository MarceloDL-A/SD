# Piperun Connector for Data Studio

### Deploy the connector

First run in the terminal:
`npx @google/dscc-gen connector`

You'll be prompted for a few details for your new connector. First-time users will be asked to authenticate clasp. clasp is a tool for creating & modifying Apps Script projects from the command-line.

After completing the prompts, dscc-gen will create a new Apps Script project and print out everything it can do.

Replace the generated src folder by the src folder of this project.

Make sure the file `.clasp.json` has the following properties:
`{"scriptId":[[YOUR SCRIPT ID]],"rootDir":"src"}`

Push changes:
`npm run push`

## Using the connector in Data Studio

Once you've set up and deployed the connector, follow the
[Use a Community Connector]() guide to use the connector in Data Studio.

**Note**: After using the connector in Data Studio, as long as you do not
[revoke access](), it will remain listed in the [connector list]() for easy access
when [creating a new data source]().
