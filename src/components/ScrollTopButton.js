const ScrollTopButton = () => {
  const scrollToTopHandler = () => {
    //temp
    window.scrollTo(0, 0);
  };
  return (
    <button
      onClick={scrollToTopHandler}
      class="btn-scroll-top btn icon medium circle primary float bottom right"
    >
      <i class="fas fa-arrow-up"></i>
    </button>
  );
};

export default ScrollTopButton;
