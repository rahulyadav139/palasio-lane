const getFilteredProducts = products => {
  return price => {
    const firstFiltered = !price
      ? products
      : products.filter(
          product => price >= product.price * ((100 - product.discount) / 100)
        );
    return models => {
      const secondFiltered = !models.length
        ? firstFiltered
        : firstFiltered.filter(product => models.includes(product.car.model));
      return rating => {
        const thirdFiltered = !rating
          ? secondFiltered
          : secondFiltered.filter(product => product.rating >= rating);
        return sortBy => {
          switch (sortBy) {
            case 'low-to-high':
              console.log(sortBy);
              return thirdFiltered
                .slice()
                .sort(
                  (a, b) =>
                    a.price * ((100 - a.discount) / 100) -
                    b.price * ((100 - b.discount) / 100)
                );
            case 'high-to-low':
              return thirdFiltered
                .slice()
                .sort(
                  (a, b) =>
                    b.price * ((100 - a.discount) / 100) -
                    a.price * ((100 - a.discount) / 100)
                );
            default:
              return thirdFiltered;
          }
        };
      };
    };
  };
};
export { getFilteredProducts };
