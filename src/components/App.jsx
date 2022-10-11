import { Component } from 'react';
import axios from 'axios';
import { Box } from './Box/Box';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';

const API_KEY = '29476807-778104ca63f185ac7ce275560';

export class App extends Component {
  state = {
    query: '',
    images: [],
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      query: e.target.elements.query.value,
    });
    e.target.reset();
  };

  componentDidUpdate(_, prevState) {
    if (prevState.query !== this.state.query) {
      try {
        axios
          .get(
            'https://pixabay.com/api/?q=cat&page=1&image_type=photo&orientation=horizontal&per_page=12',
            {
              params: {
                key: API_KEY,
                q: this.state.query,
                per_page: 12,
              },
            }
          )
          .then(response => {
            this.setState({ images: response.data.hits });
          });
      } catch (error) {
        console.log(error);
      }
    }
  }

  render() {
    return (
      <Box>
        <Searchbar onSubmit={this.handleSubmit}></Searchbar>
        <ImageGallery>
          <ImageGalleryItem data={this.state.images}></ImageGalleryItem>
        </ImageGallery>
      </Box>
    );
  }
}
