# splat-web

A fork of SPLAT (Signal Propagation, Transmission, And Loss) targeting Web
Assembly

## Installation

`splat-web` is [published to NPM](https://www.npmjs.com/package/splat-web), so
you can install it with

```bash
pnpm add splat-web
```

or with your favorite node package manager.

## Development

To build the package from source, this package requires a few build time
dependencies:

- [Meson](https://mesonbuild.com/)
- [emscripten](https://emscripten.org/)
- A C/C++ compiler toolchain

To compile, run

```bash
pnpm build
```

This will clean out any existing build artefacts in `./dist`, then cross-compile
the SPLAT source to target Web Assembly. This produces a bunch of files, only a
few of which we discuss here:

```
dist
├── compile_commands.json
├── splat-base.d.ts
├── splat.d.ts
├── splat.js
├── splat.wasm
├── srtm2sdf.d.ts
├── srtm2sdf.js
└── srtm2sdf.wasm
```

`compile_commands.json` will be useful for your C++ LSP server to provide
completion results, linting, and static analysis for development.

The rest of the files above are what you'd distribute as part of your web
application. For a working example of how to use this, see
https://waveguide.dev.

### Differences with SPLAT

In accordance with the GPL-2.0, I've made changes to the original source. You
can find them clearly labeled in the git history of the project. All of the
changes I've made are under my github username (@peytondmurray).

The most interesting changes are:

- The bash scripts previously used for building have been replaced with Meson
- Sensible build settings for getting this to work in the browser have been
  chosen. Most importantly:

  - The stack size has been increased to 2^24, otherwise splat calculations were
    failing
  - We include MESON_VERSION and GIT_TAG compile args; at some point in the
    future I'd like to make SPLAT write these to the console so that I can debug
    user issues more effectively
  - Set HD_MODE=0 and MAXPAGES=4; we really need to be careful not to load too
    much data into the user's browser; even with these settings it can take a
    lot of memory to run a calculation
  - We also build and bundle SRTM2SDF as part of this package, because we need
    it to convert .hgt files to .sdf for calculations.
  - Removed a bunch of the code that spits out progress info to stdout,
    replacing it with a call to the `Module.progress` JS function (if present).
    This allows progress to be reported to the frontend, instead of just to the
    developer console.

#### Optimizations

There were two places where I was able to optimize tiny self-contained parts of
the most computationally expensive functions. `perf record` was super useful
here:

- Optimized the `hzns` function to use a branchless approach, which is now in
  `hzns_fast`. Since this is the hottest part of the code, the branch
  predictor becomes a bottleneck to performance here, and going branchless
  resulted in a surprisingly large speedup (>10% overall!!!).
- Removed the deepest loop in `d1thx`. It wasn't necessary at all, you could
  just do a bit of arithmetic to achieve the same end result.

I really don't have the confidence to modify much more than this because most of
the code is undocumented and function/variable names are frustratingly cryptic,
so it's anyone's guess as to what anything does here :/

## License

Since SPLAT is licensed under GPL-2.0, this project must also be licensed under
GPL-2.0. See LICENSE for details.
