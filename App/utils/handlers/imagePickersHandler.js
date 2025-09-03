import {Platform} from 'react-native';
import {PERMISSIONS} from 'react-native-permissions';
import permissionUtils from '../permissionUtils';
import { isAndroidBelow10 } from '../platform';
import imageUtils from '../imageUtils';

const galleryPermission = Platform.select({
  ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
  android: isAndroidBelow10
    ? PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
    : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
});

const cameraPermission = Platform.select({
  ios: PERMISSIONS.IOS.CAMERA,
  android: PERMISSIONS.ANDROID.CAMERA,
});

export const handleSingleGalleryImage = async (t) => {
  try {
    const isPermitted = await permissionUtils.getSinglePermission(
      galleryPermission,
      t
    );
    if (isPermitted) {
      const {error, image} = await imageUtils.getSingleImageFromGallery(
        1200,
        1500,
      );
      if (error) {
        if (error?.code !== 'E_PICKER_CANCELLED') {
          console.error(error.code);
          //handle error
        }
        return null;
      } else {
        return image;
      }
    } else {
      return null;
    }
  } catch (error) {
    // handle error
    console.error(error);
    return null;
  }
};

export const handleMultipleGalleryImage = async (t) => {
  try {
    const isPermitted = await permissionUtils.getSinglePermission(
      galleryPermission,
      t
    );
    if (isPermitted) {
      const {error, images} = await imageUtils.getMultipleImageFromGallery(
        250,
        250,
      );
      if (error) {
        if (error?.code !== 'E_PICKER_CANCELLED') {
          console.error(error.code);
          //handle error
        }
      } else {
        console.log('[Test]', images);
      }
    }
  } catch (error) {
    // handle error
    console.error(error);
  }
};

export const handleCaptureCameraImage = async (t) => {
  try {
    const isPermitted = await permissionUtils.getSinglePermission(
      cameraPermission,
      t 
    );
    console.log('isPermitted', isPermitted);
    if (!isPermitted) {
      console.warn('Camera permission not granted.');
      return null;
    }

    const {error, image} = await imageUtils.captureImageFromCamera(250, 250);
    if (error) {
      if (error.code !== 'E_PICKER_CANCELLED') {
        console.error('Camera Error Code:', error.code);
      }
      return null; // Return null if there's an error
    }

    if (image && image.path) {
      console.log('[Test] Captured Image:', image); // Debugging log
      return image; // Return the image path
    } else {
      console.warn('No valid image path found in response.');
      return null;
    }
  } catch (error) {
    console.error('Error in handleCaptureCameraImage:', error);
    return null;
  }
};
