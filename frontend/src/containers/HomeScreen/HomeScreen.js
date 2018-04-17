import React from 'react';
import PropTypes from 'prop-types';

import compose from 'recompose/compose';
import withWidth from 'material-ui/utils/withWidth';
import Card, { CardHeader, CardContent } from 'material-ui/Card';
import GridList, { GridListTile } from 'material-ui/GridList';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { withStyles } from 'material-ui/styles';

const styles = () => ({
  root: {
    width: '100%',
    maxWidth: 1280,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  gridList: {
    width: '100%',
  },
});

const images = [
  {
    original: 'pic/1.jpg',
    thumbnail: 'pic/1.jpg',
  },
  {
    original: 'pic/2.jpg',
    thumbnail: 'pic/2.jpg',
  },
  {
    original: 'pic/4.gif',
    thumbnail: 'pic/4.gif',
  },
];

const HomeScreen = ({ classes, width }) => (
  <div className={classes.root}>
    <ImageGallery
      items={images}
      showThumbnails={false}
      showFullscreenButton={false}
      showPlayButton={false}
      autoPlay
      slideInterval={5000}
      onClick={(e) => {
        console.log(e);
      }}
    />
    <img
      src="pic/home1.jpg"
      alt="Adv 1"
      style={{ marginTop: 20, width: '100%' }}
    />
    <img
      src="pic/home2.jpg"
      alt="Adv 2"
      style={{ marginTop: 20, width: '100%' }}
    />
    <Card style={{ marginTop: 20, width: '100%' }}>
      <CardHeader title="New item" style={{ textAlign: 'center' }} />
      <CardContent>
        <GridList
          cellHeight={400}
          cols={(width === 'xs' || width === 'sm') ? 2 : 4}
          spacing={16}
          className={classes.gridList}
        >
          {
            [
              {
                id: 1,
                alt: 'New Skirt',
              },
              {
                id: 2,
                alt: 'New Jeans',
              },
              {
                id: 3,
                alt: 'New Jackets',
              },
              {
                id: 4,
                alt: 'New Accessories',
              },
            ].map(productCategory => (
              <GridListTile component="a" href="/products" key={productCategory.id}>
                <img
                  src={`pic/cat${productCategory.id}.png`}
                  alt={productCategory.alt}
                />
              </GridListTile>
            ))
          }
        </GridList>
      </CardContent>
    </Card>
  </div>
);

HomeScreen.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  width: PropTypes.string.isRequired,
};

export default compose(withStyles(styles), withWidth())(HomeScreen);
