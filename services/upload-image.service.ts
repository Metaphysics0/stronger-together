import { ref, StorageReference, uploadBytesResumable } from 'firebase/storage';
import { getStorage } from 'firebase/storage';
export async function uploadImageFromDevice({
  path,
  imageUri,
}: {
  path: string;
  imageUri: string;
}): Promise<StorageReference | null> {
  try {
    const storage = getStorage();
    const storageRef = ref(storage, path);
    const imageResponse = await fetch(imageUri);
    const blob = await imageResponse.blob();
    const uploadTask = await uploadBytesResumable(storageRef, blob);
    return uploadTask.ref;
  } catch (error) {
    console.error('error uploading image', error);
    return null;
  }
}
