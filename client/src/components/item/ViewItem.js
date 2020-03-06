import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  Button,
  Container,
  Row,
  Col,
  Card,
  CardText,
  CardImg
} from "reactstrap";

class ViewItem extends Component {
  goToPortfolio = () => {
    const { uploadedBy } = this.props.location.state;
    console.log(uploadedBy);
    this.props.history.push(`/portfolio/${uploadedBy}`);
  };

  goToDashboard = () => {
    this.props.history.push("/dashboard");
  };

  render() {
    const { title, category, uploadedBy } = this.props.location.state;
    return (
      <Container>
        <hr className="bg-white" />
        <Row>
          <Col sm="12" md="7">
            <Card>
              <CardImg
                top
                width="100%"
                src={`/api/files/${this.props.match.params.filename}`}
                alt="Card image cap"
              />
            </Card>
          </Col>
          <Col sm="12" md="5">
            <CardText className="text-white">
              <small>title:</small>&nbsp;
              <strong>{title}</strong>
            </CardText>
            <CardText className="text-white">
              <small>medium:</small>&nbsp;
              <strong>{category}</strong>
            </CardText>
            <hr className="bg-white" />
            <CardText className="text-white">
              <small>artist:</small>&nbsp;
              <strong>{uploadedBy}</strong>
            </CardText>
            <Button
              outline
              color="primary"
              block
              size="md"
              onClick={this.goToPortfolio}
            >
              View Artist's Portfolio
            </Button>
            <Button
              outline
              color="info"
              block
              size="md"
              // onClick={this.goToPortfolio}
            >
              Save to Favorites
            </Button>
          </Col>
        </Row>
        <hr className="bg-white" />
      </Container>
    );
  }
}

export default withRouter(ViewItem);
