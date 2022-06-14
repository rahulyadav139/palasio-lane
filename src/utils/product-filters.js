const getFilteredProducts = products => {
  return outOfStock => {
    const firstFiltered = outOfStock
      ? products
      : products.filter(product => product.inStock !== 0);

    return price => {
      const secondFiltered = !price
        ? firstFiltered
        : firstFiltered.filter(
            product => price >= product.price * ((100 - product.discount) / 100)
          );
      return models => {
        const thirdFiltered =
          !models || !models.length
            ? secondFiltered
            : secondFiltered.filter(product =>
                models.includes(product.car.model)
              );
        return rating => {
          const fourthFiltered = !rating
            ? thirdFiltered
            : thirdFiltered.filter(product => product.rating >= rating);
          return sortBy => {
            switch (sortBy) {
              case 'low-to-high':
                return fourthFiltered
                  .slice()
                  .sort(
                    (a, b) =>
                      a.price * ((100 - a.discount) / 100) -
                      b.price * ((100 - b.discount) / 100)
                  );

              case 'high-to-low':
                return fourthFiltered
                  .slice()
                  .sort(
                    (a, b) =>
                      b.price * ((100 - a.discount) / 100) -
                      a.price * ((100 - a.discount) / 100)
                  );

              default:
                return fourthFiltered;
            }
          };
        };
      };
    };
  };
};
export { getFilteredProducts };
