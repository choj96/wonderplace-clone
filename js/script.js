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

  // 비주얼 슬라이드
  // 동적 즉, 서버에서 슬라이드를 생성하는 경우
  const slideTotal = document.querySelectorAll(
    ".swVisual .swiper-slide"
  ).length;
  const slideContorlUl = document.querySelector(".sw-visual-control");
  let html = "";
  for (let i = 0; i < slideTotal; i++) {
    let tempI = i + 1;
    if (i < 9) {
      tempI = "0" + (i + 1);
    }
    html += `<li>${tempI}</li>`;
  }
  slideContorlUl.innerHTML = html;

  const swVisual = new Swiper(".swVisual", {
    loop: true,
    speed: 800,
    autoplay: {
      delay: 1000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".sw-visual-next",
      prevEl: ".sw-visual-prev",
    },
  });

  swVisual.on("slideChangeTransitionStart", function () {
    console.log("slideChangeTransitionStart", this.realIndex);
    changeSwVisual(this.realIndex);
  });

  // 비주얼 슬라이드 제어 목록
  let swVisualControlLi = document.querySelectorAll(".sw-visual-control li");
  // console.log(swVisualControlLi);
  swVisualControlLi.forEach((item, idx) => {
    item.addEventListener("click", function () {
      // 내가 만든 함수
      changeSwVisual(idx);
    });
  });

  function changeSwVisual(_idx) {
    // css 처리 (포커스 클래스 추가 및 제거)
    // 1. active 클래스 모두 제거
    swVisualControlLi.forEach((item, idx) => {
      item.classList.remove("active");
    });
    // 2. 클릭된 번호를 이용해서 클래스 추가하기
    swVisualControlLi[_idx].classList.add("active");
    //  3. 클릭된 번호를 이용해서 Swiper 를 이동
    // 주의 사항 (loop를 옵션으로 준 경우는 아래구문 금지)
    // swVisual.slideTo(_idx);
    swVisual.slideToLoop(_idx, 500);
  }
  // 최초 클릭된 것 처럼 active 클래스 추가
  if (slideTotal > 0) {
    changeSwVisual(0);
  }

  // brandSlide
  const swBrand = new Swiper(".swBrande");

  // Visual Swiper 스케일 효과
  // 참조 https://bkstudio.tistory.com/6
  // window 의 안쪽(웹브라우저 안쪽만) 높이
  let windowHeight = window.innerHeight;
  // 수직으로 몇 픽셀 만큼 스크롤 되었는지 파악
  let scrollTop = window.scrollY || window.pageYOffset;

  // 변화를 줄 대상
  let swVisualWrap = document.querySelector(".swVisual-wrap");
  function swVisualMove() {
    // scale 적용 비율값
    // transform: scale(ratio);
    let ratio = 1 + scrollTop * 0.001;
    // Y축 적용
    let transY = scrollTop * 0.05;

    // 한계값 설정
    if (ratio > 1.2) ratio = 1.2;
    if (transY > 10) transY = 10;

    // 최종 tarnsform 에 적용할 글자 완성
    let cssTxt = `translateY(${transY}%) scale(${ratio})`;
    // console.log(cssTxt);
    swVisualWrap.style.transform = cssTxt;
  }
  // 기준값 갱신
  window.addEventListener("scroll", function () {
    windowHeight = window.innerHeight;
    scrollTop = window.scrollY || window.pageYOffset;
    swVisualMove();
  });
  window.addEventListener("resize", function () {
    windowHeight = window.innerHeight;
    scrollTop = window.scrollY || window.pageYOffset;
    swVisualMove();
  });
};
