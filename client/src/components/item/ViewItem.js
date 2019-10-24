import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  Button,
  Container,
  Row,
  Col,
  Card,
  CardBody,
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
        <Container className="m-5 p-5">
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
            </Col>
            {/* upload */}
            <Col sm="12" md="3">
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
              <hr />
              <Button
                outline
                color="danger"
                size="sm"
                onClick={this.goToPortfolio}
              >
                View in Portfolio
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withRouter(ViewItem);
