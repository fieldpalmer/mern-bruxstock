import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { connect } from "react-redux";
import { Container, CardColumns } from "reactstrap";

import { getFiles, setFileLoading } from "../../redux/actions/fileActions";
import GalleryItem from "../gallery/GalleryItem";

class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  static propTypes = {
    getFiles: PropTypes.func.isRequired,
    setFileLoading: PropTypes.func.isRequired,
    files: PropTypes.object.isRequired
  };

  componentDidMount = () => {
    this.props.getFiles();
    axios
      .get("http://localhost:5000/api/users")
      .then(res => {
        let userNames = [];
        res.data.forEach(user =>
          userNames.push(
            user.name +
              "~" +
              user._id +
              "~" +
              user.email +
              "~" +
              user.stock +
              "~" +
              user.register_date
          )
        );
        this.setState({ users: userNames });
      })
      .catch(error => {
        console.log(error);
      });
  };

  matchUser = userId => {
    return this.state.users.map((username, i) => {
      const userData = username.split("~");
      const [name, id] = userData;
      return id === userId ? { name } : "";
    });
  };

  render() {
    const { files } = this.props.files;
    const userId = this.props.match.params.userid;
    const artistName = this.matchUser(userId);

    let userGallery = files.map(file =>
      file.uploadedBy === userId && file.view === "public" ? (
        <GalleryItem key={file._id} file={file} />
      ) : null
    );

    return (
      <Container>
        <small>artist:</small>
        <strong>&nbsp;{artistName}</strong>
        <hr />
        {files ? (
          <CardColumns>{userGallery}</CardColumns>
        ) : (
          <div>
            <h1>
              Doesn't look like we were able to find anything in the database
            </h1>
          </div>
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  files: state.files
});

export default connect(
  mapStateToProps,
  { getFiles, setFileLoading }
)(Portfolio);
