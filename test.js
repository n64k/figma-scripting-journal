
,
/* 
  Todo
  - If there are pre-existing column grids, use the info for the settings
  - Resize to original size?
*/

let node: FrameNode = figma.currentPage.selection[0]

// Settings
let margin = 32
let gutterSize = 16
// Totals
let columns = node.children.length
let margins = margin * 2
let gutters = gutterSize * (columns - 1)

// Make the frame perfectly divisible by the number of columns
let availableSpace = node.width - (margins + gutters)
let originalWidth = availableSpace
let newWidth = node.width - (availableSpace % columns)
node.resizeWithoutConstraints(newWidth, node.height)
availableSpace = node.width - (margins + gutters)

// Sort by x position
let sortedArray = []
node.children.forEach(child => {
  sortedArray.push({id: child.id, x: child.x})
})
sortedArray.sort((a,b) => a.x - b.x)

for(let i = 0; i < sortedArray.length -   1; i++) {
  node.insertChild(i, sortedArray[i])
}

// Size and distribute
let offset = margin
let columnWidth = availableSpace / columns 
node.children.forEach(child => {
  child.x = offset
  child.resize(columnWidth, child.height)
  offset += columnWidth + gutterSize
  // Set constraints
  let newConstraints = clone(child.constraints)
  newConstraints.horizontal = "STRETCH"
  child.constraints = newConstraints
})

// Create layout guides
let newLayoutGrids = [
  {
    pattern: "COLUMNS",
    visible: true,
    color: {
      r: 1,
      g: 0,
      b: 0,
      a: 0.10000000149011612,
    },
    gutterSize: gutterSize,
    alignment: "STRETCH",
    count: columns,
    offset: margin ,
  }
]

node.layoutGrids = newLayoutGrids


