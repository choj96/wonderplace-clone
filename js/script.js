window.onload = function () {
  // 모바일 메뉴 관련
  const navMb = document.querySelector(".nav-mb");
  const mbWrap = document.querySelector(".mb-wrap");
  navMb.addEventListener("click", function () {
    // 인라인 방식
    // if (mbWrap.style.display === "block") {
    //   mbWrap.style.display = "none";
    // } else {
    //   mbWrap.style.display = "block";
    // }

    //  클래스 추가 방식
    const state = mbWrap.classList.contains("active");
    if (state) {
      navMb.classList.remove("active");
      mbWrap.classList.remove("active");
    } else {
      navMb.classList.add("active");
      mbWrap.classList.add("active");
    }
  });
};
