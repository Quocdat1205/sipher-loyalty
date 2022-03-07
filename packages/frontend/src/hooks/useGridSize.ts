import { useStore } from "@store"

import { gridSizes } from "@constant"

export const useGridSize = () => {
  const { gridSize, setGridSize } = useStore(state => ({
    gridSize: state.gridSize,
    setGridSize: state.setGridSize,
  }))

  const gridSelections = gridSizes.map(size => ({
    key: size,
    isActive: gridSize === size,
    onSelect: () => setGridSize(size),
  }))

  return gridSelections
}

export default useGridSize
