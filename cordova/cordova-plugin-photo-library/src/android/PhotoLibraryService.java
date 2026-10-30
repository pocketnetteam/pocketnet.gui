package com.terikon.cordova.photolibrary;

import android.content.ContentResolver;
import android.content.ContentUris;
import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Matrix;
import android.media.ExifInterface;
import android.media.MediaScannerConnection;
import android.media.ThumbnailUtils;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.provider.MediaStore;
import android.util.Base64;
import android.util.Size;

import org.apache.cordova.LOG;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.TimeZone;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

// Works only through MediaStore content URIs: file paths are not readable with scoped storage
// and with partial access (READ_MEDIA_VISUAL_USER_SELECTED) on Android 14+.
public class PhotoLibraryService {
  private static final String TAG = "PhotoLibrary";

  public static final String PERMISSION_ERROR = "Permission Denial: This application is not allowed to access Photo data.";

  private static final Uri COLLECTION = MediaStore.Images.Media.EXTERNAL_CONTENT_URI;

  private static final String COLUMN_ORIENTATION = "orientation";

  private static final Pattern DATA_URL_PATTERN = Pattern.compile("^data:(image/[a-zA-Z0-9.+-]+);base64,");

  private static PhotoLibraryService instance = null;

  public static synchronized PhotoLibraryService getInstance() {
    if (instance == null) {
      instance = new PhotoLibraryService();
    }
    return instance;
  }

  public interface ChunkCallback {
    void run(JSONArray chunk, int chunkNum, boolean isLastChunk) throws JSONException;
  }

  public static class PictureData {
    public final byte[] bytes;
    public final String mimeType;

    public PictureData(byte[] bytes, String mimeType) {
      this.bytes = bytes;
      this.mimeType = mimeType;
    }
  }

  // Images only, newest first. The last chunk is always sent, even if empty.
  public void getLibrary(Context context, int itemsInChunk, int maxItems, ChunkCallback callback) throws JSONException {
    String[] projection = {
      MediaStore.Images.Media._ID,
      MediaStore.Images.Media.WIDTH,
      MediaStore.Images.Media.HEIGHT,
      MediaStore.Images.Media.DATE_TAKEN,
      MediaStore.Images.Media.DATE_ADDED,
      COLUMN_ORIENTATION
    };

    String sortOrder = MediaStore.Images.Media.DATE_TAKEN + " DESC, " + MediaStore.Images.Media.DATE_ADDED + " DESC";

    SimpleDateFormat dateFormatter = createDateFormatter();
    JSONArray chunk = new JSONArray();
    int chunkNum = 0;

    Cursor cursor = context.getContentResolver().query(COLLECTION, projection, null, null, sortOrder);

    try {
      if (cursor != null) {
        int total = cursor.getCount();

        if (maxItems > 0) {
          total = Math.min(total, maxItems);
        }

        int count = 0;

        while (count < total && cursor.moveToNext()) {
          chunk.put(toLibraryItem(cursor, dateFormatter));
          count++;

          if (count < total && itemsInChunk > 0 && chunk.length() >= itemsInChunk) {
            callback.run(chunk, chunkNum, false);
            chunk = new JSONArray();
            chunkNum++;
          }
        }
      }
    } finally {
      if (cursor != null) {
        cursor.close();
      }
    }

    callback.run(chunk, chunkNum, true);
  }

  public PictureData getThumbnail(Context context, String photoId, int width, int height, double quality) throws IOException {
    Uri uri = getUri(photoId);
    Bitmap bitmap = null;

    // loadThumbnail uses the system thumbnail cache and applies EXIF orientation
    if (Build.VERSION.SDK_INT >= 29) {
      try {
        bitmap = context.getContentResolver().loadThumbnail(uri, new Size(width, height), null);
      } catch (IOException e) {
        LOG.w(TAG, "loadThumbnail failed, decoding the image", e);
      }
    }

    if (bitmap == null) {
      bitmap = decodeSampled(context, uri, width, height);
      bitmap = rotate(bitmap, readOrientation(context, uri));
    }

    if (bitmap == null) {
      return null;
    }

    Bitmap thumbnail = ThumbnailUtils.extractThumbnail(bitmap, width, height);

    if (thumbnail != bitmap) {
      bitmap.recycle();
    }

    byte[] bytes = compress(thumbnail, Bitmap.CompressFormat.JPEG, quality);
    thumbnail.recycle();

    return new PictureData(bytes, "image/jpeg");
  }

  // Returns the photo rotated by EXIF and scaled down to fit maxWidth x maxHeight
  public PictureData getPhoto(Context context, String photoId, int maxWidth, int maxHeight, double quality) throws IOException {
    Uri uri = getUri(photoId);
    String mimeType = context.getContentResolver().getType(uri);

    // Keep animation
    if ("image/gif".equals(mimeType)) {
      InputStream is = context.getContentResolver().openInputStream(uri);

      try {
        return new PictureData(readBytes(is), mimeType);
      } finally {
        is.close();
      }
    }

    Bitmap bitmap = decodeSampled(context, uri, maxWidth, maxHeight);

    if (bitmap == null) {
      return null;
    }

    bitmap = rotate(bitmap, readOrientation(context, uri));
    bitmap = scaleToFit(bitmap, maxWidth, maxHeight);

    boolean png = "image/png".equals(mimeType) && bitmap.hasAlpha();
    byte[] bytes = compress(bitmap, png ? Bitmap.CompressFormat.PNG : Bitmap.CompressFormat.JPEG, quality);

    bitmap.recycle();

    return new PictureData(bytes, png ? "image/png" : "image/jpeg");
  }

  // Saves a dataURL image to Pictures/<app name> and returns its library item
  public JSONObject saveImage(Context context, String dataURL) throws IOException, JSONException {
    Matcher matcher = DATA_URL_PATTERN.matcher(dataURL);

    if (!matcher.find()) {
      throw new IllegalArgumentException("The dataURL is in incorrect format");
    }

    String mimeType = matcher.group(1);
    byte[] bytes = Base64.decode(dataURL.substring(matcher.end()), Base64.DEFAULT);

    String fileName = "IMG_" + new SimpleDateFormat("yyyyMMdd_HHmmss", Locale.US).format(new Date()) + getExtension(mimeType);
    String folder = getAlbumName(context);

    long id = Build.VERSION.SDK_INT >= 29
      ? insertImage(context, bytes, fileName, mimeType, folder)
      : writeImageFile(context, bytes, fileName, folder);

    JSONObject item = queryLibraryItem(context, id);

    if (item == null) {
      item = new JSONObject();
      item.put("id", String.valueOf(id));
    }

    return item;
  }

  // Helpers

  private long insertImage(Context context, byte[] bytes, String fileName, String mimeType, String folder) throws IOException {
    ContentResolver resolver = context.getContentResolver();

    ContentValues values = new ContentValues();
    values.put(MediaStore.Images.Media.DISPLAY_NAME, fileName);
    values.put(MediaStore.Images.Media.MIME_TYPE, mimeType);
    values.put(MediaStore.Images.Media.RELATIVE_PATH, Environment.DIRECTORY_PICTURES + File.separator + folder);
    values.put(MediaStore.Images.Media.IS_PENDING, 1);

    Uri uri = resolver.insert(MediaStore.Images.Media.getContentUri(MediaStore.VOLUME_EXTERNAL_PRIMARY), values);

    if (uri == null) {
      throw new IOException("Could not create the image in MediaStore");
    }

    try {
      OutputStream os = resolver.openOutputStream(uri);

      if (os == null) {
        throw new IOException("Could not open the image in MediaStore");
      }

      try {
        os.write(bytes);
      } finally {
        os.close();
      }
    } catch (IOException e) {
      resolver.delete(uri, null, null);
      throw e;
    }

    values.clear();
    values.put(MediaStore.Images.Media.IS_PENDING, 0);
    resolver.update(uri, values, null, null);

    return ContentUris.parseId(uri);
  }

  // Android 9 and lower: requires WRITE_EXTERNAL_STORAGE
  private long writeImageFile(Context context, byte[] bytes, String fileName, String folder) throws IOException {
    File directory = new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES), folder);

    if (!directory.exists() && !directory.mkdirs()) {
      throw new IOException("Could not create the album directory");
    }

    File file = new File(directory, fileName);
    FileOutputStream os = new FileOutputStream(file);

    try {
      os.write(bytes);
    } finally {
      os.close();
    }

    final Uri[] scanned = new Uri[1];
    final CountDownLatch latch = new CountDownLatch(1);

    MediaScannerConnection.scanFile(context, new String[] { file.getAbsolutePath() }, null, new MediaScannerConnection.OnScanCompletedListener() {
      public void onScanCompleted(String path, Uri uri) {
        scanned[0] = uri;
        latch.countDown();
      }
    });

    try {
      latch.await(10, TimeUnit.SECONDS);
    } catch (InterruptedException e) {
      Thread.currentThread().interrupt();
    }

    if (scanned[0] == null) {
      throw new IOException("The image was saved but not added to the library");
    }

    return ContentUris.parseId(scanned[0]);
  }

  private JSONObject queryLibraryItem(Context context, long id) throws JSONException {
    String[] projection = {
      MediaStore.Images.Media._ID,
      MediaStore.Images.Media.WIDTH,
      MediaStore.Images.Media.HEIGHT,
      MediaStore.Images.Media.DATE_TAKEN,
      MediaStore.Images.Media.DATE_ADDED,
      COLUMN_ORIENTATION
    };

    Cursor cursor = context.getContentResolver().query(ContentUris.withAppendedId(COLLECTION, id), projection, null, null, null);

    if (cursor == null) {
      return null;
    }

    try {
      return cursor.moveToFirst() ? toLibraryItem(cursor, createDateFormatter()) : null;
    } finally {
      cursor.close();
    }
  }

  private static JSONObject toLibraryItem(Cursor cursor, SimpleDateFormat dateFormatter) throws JSONException {
    int width = getInt(cursor, MediaStore.Images.Media.WIDTH);
    int height = getInt(cursor, MediaStore.Images.Media.HEIGHT);
    int orientation = getInt(cursor, COLUMN_ORIENTATION);

    long dateTaken = getLong(cursor, MediaStore.Images.Media.DATE_TAKEN);
    long date = dateTaken > 0 ? dateTaken : getLong(cursor, MediaStore.Images.Media.DATE_ADDED) * 1000;

    JSONObject item = new JSONObject();
    item.put("id", String.valueOf(getLong(cursor, MediaStore.Images.Media._ID)));
    item.put("width", orientation == 90 || orientation == 270 ? height : width);
    item.put("height", orientation == 90 || orientation == 270 ? width : height);
    item.put("creationDate", dateFormatter.format(new Date(date)));

    return item;
  }

  private static int getInt(Cursor cursor, String column) {
    int index = cursor.getColumnIndex(column);
    return index >= 0 && !cursor.isNull(index) ? cursor.getInt(index) : 0;
  }

  private static long getLong(Cursor cursor, String column) {
    int index = cursor.getColumnIndex(column);
    return index >= 0 && !cursor.isNull(index) ? cursor.getLong(index) : 0;
  }

  private static Uri getUri(String photoId) {
    return ContentUris.withAppendedId(COLLECTION, Long.parseLong(photoId));
  }

  private static SimpleDateFormat createDateFormatter() {
    SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.US);
    formatter.setTimeZone(TimeZone.getTimeZone("UTC"));
    return formatter;
  }

  private static String getAlbumName(Context context) {
    CharSequence label = context.getApplicationInfo().loadLabel(context.getPackageManager());
    String name = label != null ? label.toString().replaceAll("[\\\\/:*?\"<>|]", "").trim() : "";

    return name.isEmpty() ? "Camera" : name;
  }

  private static String getExtension(String mimeType) {
    if ("image/png".equals(mimeType)) return ".png";
    if ("image/gif".equals(mimeType)) return ".gif";
    if ("image/webp".equals(mimeType)) return ".webp";
    return ".jpg";
  }

  // Decodes the image with the largest power of 2 sample size that keeps it not smaller than requested
  private static Bitmap decodeSampled(Context context, Uri uri, int reqWidth, int reqHeight) throws IOException {
    ContentResolver resolver = context.getContentResolver();

    BitmapFactory.Options options = new BitmapFactory.Options();
    options.inJustDecodeBounds = true;

    InputStream is = resolver.openInputStream(uri);

    try {
      BitmapFactory.decodeStream(is, null, options);
    } finally {
      is.close();
    }

    if (options.outWidth <= 0 || options.outHeight <= 0) {
      return null;
    }

    options.inSampleSize = calculateInSampleSize(options.outWidth, options.outHeight, reqWidth, reqHeight);
    options.inJustDecodeBounds = false;

    is = resolver.openInputStream(uri);

    try {
      return BitmapFactory.decodeStream(is, null, options);
    } finally {
      is.close();
    }
  }

  private static int calculateInSampleSize(int width, int height, int reqWidth, int reqHeight) {
    int inSampleSize = 1;

    while ((width / (inSampleSize * 2)) >= reqWidth && (height / (inSampleSize * 2)) >= reqHeight) {
      inSampleSize *= 2;
    }

    return inSampleSize;
  }

  private static Bitmap scaleToFit(Bitmap bitmap, int maxWidth, int maxHeight) {
    int width = bitmap.getWidth();
    int height = bitmap.getHeight();

    if (width <= maxWidth && height <= maxHeight) {
      return bitmap;
    }

    double scale = Math.min((double) maxWidth / width, (double) maxHeight / height);
    Bitmap scaled = Bitmap.createScaledBitmap(bitmap, Math.max(1, (int) Math.round(width * scale)), Math.max(1, (int) Math.round(height * scale)), true);

    if (scaled != bitmap) {
      bitmap.recycle();
    }

    return scaled;
  }

  private static int readOrientation(Context context, Uri uri) {
    try {
      InputStream is = context.getContentResolver().openInputStream(uri);

      try {
        return new ExifInterface(is).getAttributeInt(ExifInterface.TAG_ORIENTATION, ExifInterface.ORIENTATION_NORMAL);
      } finally {
        is.close();
      }
    } catch (Exception e) {
      return ExifInterface.ORIENTATION_NORMAL;
    }
  }

  // see http://www.daveperrett.com/articles/2012/07/28/exif-orientation-handling-is-a-ghetto/
  private static Bitmap rotate(Bitmap source, int orientation) {
    if (source == null) {
      return null;
    }

    Matrix matrix = new Matrix();

    switch (orientation) {
      case ExifInterface.ORIENTATION_FLIP_HORIZONTAL:
        matrix.setScale(-1, 1);
        break;
      case ExifInterface.ORIENTATION_ROTATE_180:
        matrix.setRotate(180);
        break;
      case ExifInterface.ORIENTATION_FLIP_VERTICAL:
        matrix.setRotate(180);
        matrix.postScale(-1, 1);
        break;
      case ExifInterface.ORIENTATION_TRANSPOSE:
        matrix.setRotate(90);
        matrix.postScale(-1, 1);
        break;
      case ExifInterface.ORIENTATION_ROTATE_90:
        matrix.setRotate(90);
        break;
      case ExifInterface.ORIENTATION_TRANSVERSE:
        matrix.setRotate(-90);
        matrix.postScale(-1, 1);
        break;
      case ExifInterface.ORIENTATION_ROTATE_270:
        matrix.setRotate(-90);
        break;
      default:
        return source;
    }

    Bitmap rotated = Bitmap.createBitmap(source, 0, 0, source.getWidth(), source.getHeight(), matrix, true);

    if (rotated != source) {
      source.recycle();
    }

    return rotated;
  }

  private static byte[] compress(Bitmap bitmap, Bitmap.CompressFormat format, double quality) {
    ByteArrayOutputStream stream = new ByteArrayOutputStream();
    bitmap.compress(format, (int) Math.round(quality * 100), stream);
    return stream.toByteArray();
  }

  private static byte[] readBytes(InputStream inputStream) throws IOException {
    ByteArrayOutputStream buffer = new ByteArrayOutputStream();
    byte[] chunk = new byte[16384];
    int length;

    while ((length = inputStream.read(chunk)) != -1) {
      buffer.write(chunk, 0, length);
    }

    return buffer.toByteArray();
  }
}
