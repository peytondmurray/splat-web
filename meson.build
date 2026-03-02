project(
  'splat',
  ['c', 'cpp'],
  version: run_command(
    [
      'sh',
      '-c',
      'npm version from-git --no-git-tag-version --allow-same-version',
    ],
    check: true
  ).stdout().strip(),
  default_options: [
    'strip=true',
    'optimization=2'
  ]
)

compiler = meson.get_compiler('cpp')

m_dep = compiler.find_library('m', required : true)
bz2_dep = declare_dependency(
  compile_args: ['-sUSE_BZIP2'],
  link_args: ['-sUSE_BZIP2'],
)

wasm_compile_args = [
    '-DMESON_VERSION=@0@'.format(meson.version()),
    '-DGIT_TAG=@0@'.format(meson.project_version()),
]

# https://github.com/sebastianotronto/emscripten-tutorial/blob/master/04_no_block/build.sh
wasm_link_args = [
    '-sEXPORT_ES6',
    '-sMODULARIZE',
    '-sEXPORTED_RUNTIME_METHODS=FS,PROXYFS,callMain',
    '-lproxyfs.js',
]

includes = [
  'src/fontdata.h'
]

executable(
  'splat',
  sources : [
    'src/itwom3.0.cpp',
    'src/splat.cpp'
  ],
  dependencies : [
    bz2_dep,
    m_dep,
  ],
  cpp_args : wasm_compile_args + [
    '-DMAXPAGES=16',
    '-DHD_MODE=1',
  ],
  link_args : wasm_link_args + [
    '-sEXPORT_NAME=Splat',
    '--emit-tsd=splat.d.ts',
  ]
)

executable(
  'srtm2sdf',
  sources : [
    'utils/srtm2sdf.c'
  ],
  dependencies : [
    bz2_dep,
  ],
  c_args : wasm_compile_args,
  link_args : wasm_link_args + [
    '-sEXPORT_NAME=Srtm2sdf',
    '--emit-tsd=srtm2sdf.d.ts',
  ]
)
