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
bz2_dep = dependency('bzip2', required: true)

add_project_arguments(
  [
    '-DMAXPAGES=8',
    '-DHD_MODE=1',
    '-DMESON_VERSION=@0@'.format(meson.version()),
    '-DGIT_TAG=@0@'.format(meson.project_version()),
  ],
  language: 'cpp'
)

sources = [
  'itwom3.0.cpp',
  'splat.cpp'
]

executable(
  'splat',
  sources,
  dependencies : [
    bz2_dep
  ]
)
