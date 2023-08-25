import { useState, useEffect } from "react";
import { Card, Carousel } from "react-bootstrap";
import { images } from "./ImgSolds";

export const Sold = () => {
  const [numVisibleImages, setNumVisibleImages] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 1200) {
        setNumVisibleImages(5);
      } else if (screenWidth >= 768) {
        setNumVisibleImages(4);
      } else if (screenWidth >= 576) {
        setNumVisibleImages(3);
      } else {
        setNumVisibleImages(2);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <h4>Más Vendidos</h4>
      <div className="container">
        <Carousel interval={5000}>
          {Array.from({
            length: Math.ceil(images.length / numVisibleImages),
          }).map((_, index) => (
            <Carousel.Item key={index}>
              <div className="d-flex flex-wrap justify-content-center">
                {images
                  .slice(
                    index * numVisibleImages,
                    (index + 1) * numVisibleImages
                  )
                  .map((image, imageIndex) => (
                    <Card
                      key={imageIndex}
                      style={{ width: "200px", margin: "10px" }}
                    >
                      <Card.Img variant="top" src={image} />
                      <Card.Body>
                        <Card.Title>
                          Card {index * numVisibleImages + imageIndex + 1}
                        </Card.Title>
                        <Card.Text>Image name</Card.Text>
                      </Card.Body>
                    </Card>
                  ))}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </>
  );
};
