export default {
  math: {
    type: {
      simple: "simple",
      advanced: "advanced"
    },
    events: {
      view: {
        setDigit: "setDigit",
        setAction: "setAction",
        setUndo: "setUndo",
        setReset: "setReset",
        setGroup: "setGroup"
      },
      core: {
        changeCommands: "changeCommands"
      }
    },
    operators: {
      add: 'add',
      subtract: 'subtract',
      multiply: 'multiply',
      divide: 'divide',
      group: 'group'
    }
  }
}
