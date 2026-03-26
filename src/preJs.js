Module.progress = undefined
function progress(label, current, total) {
  if (Module['progress']) {
    Module['progress'](label, current, total)
  }
}
