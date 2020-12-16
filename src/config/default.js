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
        openGroup: "openGroup",
        closeGroup: "closeGroup"
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
      openGroup: 'openGroup',
      closeGroup: "closeGroup"
    }
  }
}
