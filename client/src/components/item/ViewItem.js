import React, { Component } from "react";
// import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// import { setFileLoading } from "../../actions/fileActions";
import { Button, Container, Card, CardImg } from "reactstrap";

class ViewItem extends Component {
  componentDidMount = () => {
    // this.props.setFile(this.props.match.params.filename);
    console.log(this.props);
  };

  goToPortfolio = () => {
    const { uploadedBy } = this.props.file;
    this.props.history.push(`/portfolio/${uploadedBy}`);
    // this.props.history.push(`/portfolio/5cf74ae7906085c7833b196a`);
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
