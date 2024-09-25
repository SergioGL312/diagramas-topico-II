import React from 'react';

const ImageCollage = ({ images }) => {
  return (
    <div style={styles.container}>
      {images.map((image, index) => (
        <div key={index} style={styles.imageContainer}>
          <img
            src={image.src}
            alt={`Collage image ${index + 1}`}
            style={styles.image}
          />
          <div style={styles.overlay}>
            <p style={styles.description}>{image.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  imageContainer: {
    width: 'calc(33.333% - 10px)',
    margin: '5px',
    position: 'relative',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  description: {
    color: 'white',
    textAlign: 'center',
    padding: '10px',
  },
};

export default ImageCollage;