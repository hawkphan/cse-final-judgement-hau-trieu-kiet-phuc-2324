//import styled from 'styled-components';

type LayoutProps = {
  children: React.ReactNode | undefined;
};

export default function Carousel({ children }: LayoutProps) {
/*   let slideIndex = 1;
  showSlides(slideIndex);

  // Next/previous controls
  function plusSlides(n) {
    showSlides((slideIndex += n));
  }

  // Thumbnail image controls
  function currentSlide(n) {
    showSlides((slideIndex = n));
  }

  function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides")  as HTMLCollectionOf<HTMLElement>;
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
  } */
  return (
    <div style={{ width: "100%", height: "400px", backgroundColor: "red" }}>
      <div
        style={{
          maxWidth: "1000px",
          minWidth: "200px",
          height: "100%",
          position: "relative",
          margin: "auto",
          backgroundColor: "blue",
        }}
      >
        <div className="mySlides"
          style={
            {
              // display: "none"
            }
          }
        >
          <div
            style={{
              color: "#f2f2f2",
              fontSize: "12px",
              padding: "8px 12px",
              position: "absolute",
              top: 0,
            }}
          >
            1 / 3
          </div>
          <div>
            <img src="src\assets\folder-icon.png" alt="Girl in a jacket" />
          </div>
          <div
            style={{
              color: "#f2f2f2",
              fontSize: "15px",
              padding: "8px 12px",
              position: "absolute",
              bottom: "8px",
              width: "100%",
              textAlign: "center",
            }}
          >
            Caption Text
          </div>
        </div>

        <a
          style={{
            cursor: "pointer",
            position: "absolute",
            left: "0px",
            top: "50%",
            width: "auto",
            marginTop: "-22px",
            padding: "16px",
            color: "white",
            fontWeight: "bold",
            fontSize: "18px",
            transition: "0.6s ease",
            borderRadius: "0 3px 3px 0",
            userSelect: "none",
          }}
        >
          &#10094;
        </a>
        <a
          style={{
            cursor: "pointer",
            position: "absolute",
            right: "0px",
            top: "50%",
            width: "auto",
            marginTop: "-22px",
            padding: "16px",
            color: "white",
            fontWeight: "bold",
            fontSize: "18px",
            transition: "0.6s ease",
            borderRadius: "0 3px 3px 0",
            userSelect: "none",
          }}
        >
          &#10095;
        </a>
      </div>

      <br />

      <div style={{ textAlign: "center" }}>
        <span
          style={{
            cursor: "pointer",
            height: "15px",
            width: "15px",
            margin: "0 2px",
            backgroundColor: "#bbb",
            borderRadius: "50%",
            display: "inline-block",
            transition: "background-color 0.6s ease",
          }}
        ></span>
      </div>
    </div>
  );
}
