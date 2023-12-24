import "bootstrap/dist/css/bootstrap.min.css";
import { StyleSheet } from "react-native";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import { Divider } from "semantic-ui-react";

const Test = () => {
  return (
    <>
      <Carousel style={{marginBottom: '50px'}}>
        <Carousel.Item>
          <Image
            src="public/assets/categoryImages/culture.jpg"
            rounded
            alt="fist"
            style={{ width: "100%", height: "500px" }}
          />
          <Carousel.Caption>Caption 1</Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <Image
            src="public/assets/categoryImages/drinks.jpg"
            rounded
            alt="second"
            style={{ width: "100%", height: "500px" }}
          />
          <Carousel.Caption>Caption 1</Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <Image
            src="public/assets/categoryImages/film.jpg"
            rounded
            alt="third"
            style={{ width: "100%", height: "500px" }}
          />
          <Carousel.Caption>Caption 1</Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <Image
            src="public/assets/categoryImages/food.jpg"
            rounded
            alt="fourth"
            style={{ width: "100%", height: "500px" }}
          />
          <Carousel.Caption>Caption 1</Carousel.Caption>
        </Carousel.Item>
      </Carousel>


      <Container>
        <Row>
          <Col xs lg="4">
            <Image
              src="public/assets/categoryImages/food.jpg"
              roundedCircle
              alt="second"
              style={{ height: "150px", width: "150px" }}
            />
            <p>
              Cùng tìm hiểu và học thêm nhiều kiến thức về các loài sinh vật.
            </p>
            <p>
              <a className="btn btn-secondary" href="#">
                Xem Thêm &raquo;
              </a>
            </p>
          </Col>
          <Col xs lg="4">
            <Image
              src="public/assets/categoryImages/food.jpg"
              roundedCircle
              alt="second"
              style={{ height: "150px", width: "150px" }}
            />
            <p>
              Cùng tìm hiểu và học thêm nhiều kiến thức về các loài sinh vật.
            </p>
            <p>
              <a className="btn btn-secondary" href="#">
                Xem Thêm &raquo;
              </a>
            </p>
          </Col>
          <Col xs lg="4">
            <Image
              src="public/assets/categoryImages/food.jpg"
              roundedCircle
              alt="second"
              style={{ height: "150px", width: "150px" }}
            />
            <p>
              Cùng tìm hiểu và học thêm nhiều kiến thức về các loài sinh vật.
            </p>
            <p>
              <a className="btn btn-secondary" href="#">
                Xem Thêm &raquo;
              </a>
            </p>
          </Col>
        </Row>

        <Divider />

        <Row>
          <Col md="7">
            <h2 className="featurette-heading fw-normal lh-1">
              Chia sẻ những kiến thức khoa học bổ ích mà có thể bạn quan tâm.
            </h2>
            <p className="lead">
              Bạn ưa thích tìm tòi học hỏi về thế giới xung quanh? Bạn muốn khám
              phá và biết thêm thông tin về những loài sinh vật, môi trường, và
              những điều bí ẩn trên khắp thế giới? Đừng bỏ lỡ Nature Dex. Chúng
              tôi cam kết sẽ luôn đem đến cho bạn những thông tin bổ ích và thú
              vị nhất.
            </p>
          </Col>
          <Col md="5">
            <Image
              src="public/assets/categoryImages/food.jpg"
              rounded
              alt="fourth"
              style={{ height: "450px", width: "450px" }}
            />
          </Col>
        </Row>

        <Divider />

        <Row>
        <Col md="7" xs={{ order: 'last' }}>
            <h2 className="featurette-heading fw-normal lh-1">
              Chia sẻ những kiến thức khoa học bổ ích mà có thể bạn quan tâm.
            </h2>
            <p className="lead">
              Bạn ưa thích tìm tòi học hỏi về thế giới xung quanh? Bạn muốn khám
              phá và biết thêm thông tin về những loài sinh vật, môi trường, và
              những điều bí ẩn trên khắp thế giới? Đừng bỏ lỡ Nature Dex. Chúng
              tôi cam kết sẽ luôn đem đến cho bạn những thông tin bổ ích và thú
              vị nhất.
            </p>
          </Col>
          <Col md="5" xs={{ order: 'first' }} >
            <Image
              src="public/assets/categoryImages/food.jpg"
              rounded
              alt="fourth"
              style={{ height: "450px", width: "450px" }}
            />
          </Col>

        </Row>

        <Divider />

        <Row>
          <Col md="7">
            <h2 className="featurette-heading fw-normal lh-1">
              Chia sẻ những kiến thức khoa học bổ ích mà có thể bạn quan tâm.
            </h2>
            <p className="lead">
              Bạn ưa thích tìm tòi học hỏi về thế giới xung quanh? Bạn muốn khám
              phá và biết thêm thông tin về những loài sinh vật, môi trường, và
              những điều bí ẩn trên khắp thế giới? Đừng bỏ lỡ Nature Dex. Chúng
              tôi cam kết sẽ luôn đem đến cho bạn những thông tin bổ ích và thú
              vị nhất.
            </p>
          </Col>
          <Col md="5">
            <Image
              src="public/assets/categoryImages/food.jpg"
              rounded
              alt="fourth"
              style={{ height: "450px", width: "450px" }}
            />
          </Col>
        </Row>

        <Divider />
      </Container>
    </>
  );
};

export default Test;
