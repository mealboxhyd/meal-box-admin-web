/* eslint-disable @typescript-eslint/no-explicit-any */
const CollectionUtils = {
  swapArrayElements: (arr: any[], oldIndex: number, newIndex: number) => {
    const newArr: any[] = arr ? arr.slice() : [];
    const oldElem = newArr[oldIndex];
    newArr.splice(oldIndex, 1, arr[newIndex]);
    newArr.splice(newIndex, 1, oldElem);
    return newArr;
  },
  resetArrSequence: (arr: any[], seqBy: string) => {
    const newArr = arr ? arr.slice() : [];
    const orderedArr: any[] = [];
    newArr.forEach((_x, i) => {
      const newElem = { ..._x };
      newElem[seqBy] = i;
      orderedArr.push(newElem);
    });
    return orderedArr;
  },
  sortArray: (
    dataArray: any[],
    sortField: string,
    sortOrder: "asc" | "desc"
  ) => {
    return dataArray?.sort((a: any, b: any) => {
      if (a && b && a[sortField] && b[sortField]) {
        if (a[sortField] > b[sortField]) {
          return sortOrder === "asc" ? 1 : -1;
        }
        if (a[sortField] < b[sortField]) {
          return sortOrder === "asc" ? -1 : 1;
        }
      }
      //default is assumed as equals.
      return 0;
    });
  },
};

export { CollectionUtils };
