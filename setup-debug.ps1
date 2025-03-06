# Create the .vscode directory if it doesn't exist
New-Item -Path ".vscode" -ItemType Directory -Force | Out-Null

# Create the launch.json content
$launchJson = @'
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev:debug"
    },
    {
      "name": "Next.js: debug client-side",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000"
    },
    {
      "name": "Next.js: debug full stack",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/.bin/next",
      "runtimeArgs": ["--inspect"],
      "skipFiles": ["<node_internals>/**"],
      "serverReadyAction": {
        "action": "debugWithChrome",
        "killOnServerStop": true,
        "pattern": "- Local:.+(https?://.+)",
        "uriFormat": "%s",
        "webRoot": "${workspaceFolder}"
      }
    }
  ]
}
'@

# Write the content to launch.json
Set-Content -Path ".vscode/launch.json" -Value $launchJson

Write-Host "Debugging configuration has been set up successfully!"
Write-Host "You can now use the following commands:"
Write-Host "1. npm run dev:debug - To start Next.js with debugging enabled"
Write-Host "2. In VS Code, press F5 to start debugging with one of the configured options" 