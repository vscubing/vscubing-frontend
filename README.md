# VSCubing frontend - WiP 🚧🚧🚧

- This is going to be based on an old version of [vscubing/vscubing-backend](https://github.com/vscubing/vscubing-backend) (550b7ed), until the backend refactoring is at a stage where the backend is fully functional again. 
- Gradual integration with the refactored backend is on the branch [/new-backend-and-api-codegen](https://github.com/vscubing/vscubing-frontend/tree/new-backend-and-api-codegen).
- NOTE: orval's dependencies conflict with eslint for some reason, which makes any orval CLI commands error. The workaround is to `rm -rf node_modules`, remove eslint from package.json and run `bun install`. This resolves the conflict, after which you can run orval commands (aka just `bun gen:api`) and then install eslint back.
    * here's a one-liner for that: `rm -rf node_modules && bun uninstall eslint && bun i && bun gen:api && bun install eslint -D`
