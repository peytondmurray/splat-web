project(
  'splat',
  'cpp',
  # Get a version string:
  # 1. If HEAD matches a tag, just show the tag
  # 2. Otherwise, show
  #
  #   <most recent tag>-<number of commits since tag>-g<hash>
  #
  #   and optionally append a '-dirty' if the working tree is dirty.
  version: run_command(
    [
      'sh',
      '-c',
      'git describe --tags --dirty --always --long --match *[0-9]* | sed -E "s/-0-g([0-9a-f]+)$//g"',
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

add_project_arguments(
  [
    '-DMAXPAGES=16',
    '-DHD_MODE=1',
    '-DMESON_VERSION=@0@'.format(meson.version()),
    '-DGIT_TAG=@0@'.format(meson.project_version()),
  ],
  language: 'cpp',
)

# https://github.com/sebastianotronto/emscripten-tutorial/blob/master/04_no_block/build.sh
add_project_link_arguments(
    # '-sENVIRONMENT=web',
    '-sEXPORT_ES6',
    '-sMODULARIZE',
    # '-sFORCE_FILESYSTEM=1',
    # '-sALLOW_MEMORY_GROWTH=1',
    '-sEXPORTED_FUNCTIONS=_main',
    # '-sEXPORTED_RUNTIME_METHODS=FS,callMain',
    # '-sEXPORTED_RUNTIME_METHODS=FS,callMain,ccall,cwrap',
    '-sEXPORT_NAME=Splat',
    '--emit-tsd=splat.d.ts',
  language: 'cpp',
)


sources = [
  'src/itwom3.0.cpp',
  'src/splat.cpp'
]

includes = [
  'src/fontdata.h'
]

executable(
  'splat',
  sources,
  dependencies : [
    bz2_dep,
    m_dep,
  ]
)
