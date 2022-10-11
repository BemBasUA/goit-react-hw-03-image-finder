import { Component } from 'react';
import axios from 'axios';
import { Box } from './Box/Box';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Button } from './Button/Button';
import { Audio } from 'react-loader-spinner';
import { Modal } from './Modal/Modal';

const API_KEY = '29476807-778104ca63f185ac7ce275560';

let filteredImages = [];

const pageSize = 3;

let selectedImage = '';

export class App extends Component {
  state = {
    page: 1,
    query: '',
    images: [],
    totalResults: 0,
    status: 'idle',
    showModal: false,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      page: 1,
      query: e.target.elements.query.value,
      images: [],
      totalResults: 0,
    });
    filteredImages = [];
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleImageClick = url => {
    this.toggleModal();
    selectedImage = url;
  };

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.setState({ status: 'pending' });
      try {
        axios
          .get(
            'https://pixabay.com/api/?image_type=photo&orientation=horizontal',
            {
              params: {
                page: this.state.page,
                key: API_KEY,
                q: this.state.query,
                per_page: pageSize,
              },
            }
          )
          .then(response => {
            response.data.hits.map(image => {
              filteredImages.push(image);
              return filteredImages;
            });
            this.setState({
              images: filteredImages,
              totalResults: response.data.totalHits,
              status: 'resolved',
            });
          });
      } catch (error) {
        this.setState({ status: 'rejected' });
        console.log(error);
      }
    }
  }

  render() {
    if (this.state.status === 'idle') {
      return <Searchbar onSubmit={this.handleSubmit}></Searchbar>;
    }
    if (this.state.status === 'pending') {
      return (
        <Box>
          <Searchbar onSubmit={this.handleSubmit}></Searchbar>
          <ImageGallery>
            <ImageGalleryItem data={this.state.images}></ImageGalleryItem>
          </ImageGallery>
          <Audio
            height="80"
            width="80"
            radius="9"
            color="green"
            ariaLabel="three-dots-loading"
            wrapperStyle
            wrapperClass
          />
        </Box>
      );
    }
    if (this.state.status === 'resolved') {
      return (
        <Box>
          {this.state.showModal && <Modal url={selectedImage}></Modal>}
          <Searchbar onSubmit={this.handleSubmit}></Searchbar>
          <ImageGallery>
            <ImageGalleryItem
              onClick={this.handleImageClick}
              data={this.state.images}
            ></ImageGalleryItem>
          </ImageGallery>
          <Button onClick={this.loadMore} page={this.state.page}></Button>
        </Box>
      );
    }
  }
}
