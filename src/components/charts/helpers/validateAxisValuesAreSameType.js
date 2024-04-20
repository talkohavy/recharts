function validateAxisValuesAreSameType(transformedDataForRecharts) {
  let currentType = null;
  let prevType = null;

  transformedDataForRecharts.forEach(({ x }) => {
    currentType = typeof x;

    if (prevType !== null && prevType !== currentType)
      throw new Error('All x values on all datasets MUST be of the same type!');

    prevType = currentType;
  });
}

export { validateAxisValuesAreSameType };
