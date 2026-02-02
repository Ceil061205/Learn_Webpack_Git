let name = 'bar'

exports.name = name


setTimeout(() => {
  exports.name = 'why'
}, 2000)

