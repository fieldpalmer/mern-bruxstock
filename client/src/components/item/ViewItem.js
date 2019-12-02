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
      <div>
        <Container>
          <Row>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <Card>
                <CardImg
                  top
                  width="100%"
                  src={`/api/files/${this.props.match.params.filename}`}
                  alt="Card image cap"
                />
              </Card>
              <hr />
              <CardText>
                <small>title:</small>&nbsp;
                <strong>{title}</strong>
              </CardText>
              <CardText>
                <small>artist:</small>&nbsp;
                <strong>{uploadedBy}</strong>
              </CardText>
              <CardText>
                <small>medium:</small>&nbsp;
                <strong>{category}</strong>
              </CardText>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col>
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
              <Button
                outline
                color="success"
                block
                size="md"
                // onClick={this.goToPortfolio}
              >
                Make an Offer
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withRouter(ViewItem);
