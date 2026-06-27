document
  .querySelector(".cta-btn")
  ?.addEventListener("click", () => {
    document
      .querySelector(".signup-box")
      .scrollIntoView({
        behavior: "smooth"
      });
  });
