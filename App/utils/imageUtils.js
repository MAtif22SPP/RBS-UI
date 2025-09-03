import ImagePicker from 'react-native-image-crop-picker';

const imageUtils = {
  // Call this method to select single image from gallery
  getSingleImageFromGallery: async (
    width = 300,
    height = 300,
    cropping = true,
  ) => {
    let image = {};
    let error = null;
    try {
      // default width and height are 300. You can pass any required values. Pass cropping false where calling this function if not want to use cropping
      const img = await ImagePicker.openPicker({
        width,
        height,
        cropping,
        mediaType: 'photo',
      });
      image.creationDate = img.creationDate;
      image.cropRect = img.cropRect;
      image.data = img.data;
      image.exif = img.exif;
      image.filename = img.filename;
      image.height = img.height;
      image.localIdentifier = img.localIdentifier;
      image.mime = img.mime;
      image.modificationDate = img.modificationDate;
      image.path = img.path;
      image.size = img.size;
      image.sourceURL = img.sourceURL;
      image.width = img.width;
      return {image, error};
    } catch (err) {
      error = err;
      return {image, error};
    }
  },
  // Call this method to select multiple images from gallery
  getMultipleImageFromGallery: async (
    width = 300,
    height = 300,
    cropping = true,
  ) => {
    let images = [];
    let error = null;
    try {
      // default width and height are 300. You can pass any required values. Pass cropping false where calling this function if not want to use cropping
      const imgs = await ImagePicker.openPicker({
        width,
        height,
        cropping,
        mediaType: 'photo',
        multiple: true,
      });
      imgs.forEach((img, i) => {
        let image = {};
        image.creationDate = img.creationDate;
        image.cropRect = img.cropRect;
        image.data = img.data;
        image.exif = img.exif;
        image.filename = img.filename;
        image.height = img.height;
        image.localIdentifier = img.localIdentifier;
        image.mime = img.mime;
        image.modificationDate = img.modificationDate;
        image.path = img.path;
        image.size = img.size;
        image.sourceURL = img.sourceURL;
        image.width = img.width;
        images.push(image);
      });
      return {images, error};
    } catch (err) {
      error = err;
      return {images, error};
    }
  },
  captureImageFromCamera: async (
    width = 300,
    height = 300,
    cropping = true,
  ) => {
    let image = {};
    let error = null;
    try {
      // default width and height are 300. You can pass any required values. Pass cropping false where calling this function if not want to use cropping
      const img = await ImagePicker.openCamera({
        width,
        height,
        cropping,
        mediaType: 'photo',
      });
      image.creationDate = img.creationDate;
      image.cropRect = img.cropRect;
      image.data = img.data;
      image.exif = img.exif;
      image.filename = img.filename;
      image.height = img.height;
      image.localIdentifier = img.localIdentifier;
      image.mime = img.mime;
      image.modificationDate = img.modificationDate;
      image.path = img.path;
      image.size = img.size;
      image.sourceURL = img.sourceURL;
      image.width = img.width;
      return {image, error};
    } catch (err) {
      error = err;
      return {image, error};
    }
  },
};

export default imageUtils;
