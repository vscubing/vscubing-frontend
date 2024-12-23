# VSCubing frontend

- NOTE: orval's dependencies conflict with eslint for some reason, which makes any orval CLI commands error. The workaround is to `rm -rf node_modules`, remove eslint from package.json and run `bun install`. This resolves the conflict, after which you can run orval commands (aka just `bun gen:api`) and then install eslint back.
    * here's a one-liner for that: `rm -rf node_modules && bun uninstall eslint && bun i && bun gen:api && bun install eslint -D`

## Deploying
- `bun run build-prod` to build for prod environment
- `bun run build-test` to build for test environment
Note: you can run `bun run preview` to preview the build.
