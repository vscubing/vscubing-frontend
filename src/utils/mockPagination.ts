export function getTotalPages(withOwnResult: boolean, totalResults: number, pageSize: number) {
  let totalRows = totalResults
  if (withOwnResult) {
    totalRows += getCompoundShift(totalResults, pageSize)
  }
  return Math.ceil(totalRows / pageSize)
}

export function getOwnResultPage(ownResultPlace: number | undefined, pageSize: number) {
  if (!ownResultPlace) return null
  ownResultPlace += getCompoundShift(ownResultPlace, pageSize)
  return Math.ceil(ownResultPlace / pageSize)
}

export function getPageStartEndIndexes(page: number, pageSize: number, ownResultPage: number | null) {
  let flatShift = 0
  if (ownResultPage) {
    flatShift = page * -1 + 1
    if (page > ownResultPage) {
      flatShift += 1
    }
  }

  const startIndex = (page - 1) * pageSize + flatShift
  let endIndex = startIndex + pageSize
  if (ownResultPage && page !== ownResultPage) {
    endIndex--
  }

  return { startIndex, endIndex }
}

function getCompoundShift(place: number, pageSize: number) {
  let totalShift = 0
  let shift = Math.floor((place - 1) / pageSize)
  while (shift > 0) {
    totalShift += shift
    shift = Math.floor(shift / pageSize)
  }
  return totalShift
}
