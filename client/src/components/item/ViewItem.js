import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Button, Container, Card, CardImg } from "reactstrap";

class ViewItem extends Component {
  goToPortfolio = () => {
    const { uploadedBy } = this.props.location.state;
    console.log(uploadedBy);
    this.props.history.push(`/portfolio/${uploadedBy}`);
  };

  render() {
    return (
      <div>
        <Container>
          <Card>
            <CardImg
              top
              width="100%"
              src={`/api/files/${this.props.match.params.filename}`}
              alt="Card image cap"
            />
          </Card>
          <Button onClick={this.goToPortfolio}>View in Portfolio</Button>
        </Container>
      </div>
    );
  }
}

export default withRouter(ViewItem);
