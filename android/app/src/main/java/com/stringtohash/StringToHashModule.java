package com.stringtohash;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.security.MessageDigest;
import java.util.HashMap;
import java.util.Map;

public class StringToHashModule extends ReactContextBaseJavaModule {
    public StringToHashModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "StringToHash";
    }

    @ReactMethod
    public void getHash(final String method, final String text, final Promise promise) {
        try {
            MessageDigest digest  = MessageDigest.getInstance(method);
            digest.update(text.getBytes());
            byte messageDigest[] = digest.digest();

            // Create Hex String
            StringBuffer hexString = new StringBuffer();
            for (int i = 0; i < messageDigest.length; i++)
                hexString.append(Integer.toHexString(0xFF & messageDigest[i]));
            WritableMap map = Arguments.createMap();
            map.putString("hash", hexString.toString());
            promise.resolve(map);

        } catch (Exception e) {
             promise.reject(e);
        }
    }

    @ReactMethod
    public void getFileHash(String filepath, String algorithm, Promise promise) {
        try {
            Map<String, String> algorithms = new HashMap<>();


            File file = new File(filepath);

            if (file.isDirectory()) {
                rejectFileIsDirectory(promise);
                return;
            }

            if (!file.exists()) {
                rejectFileNotFound(promise, filepath);
                return;
            }

            MessageDigest md = MessageDigest.getInstance(algorithm);

            FileInputStream inputStream = new FileInputStream(filepath);
            byte[] buffer = new byte[1024 * 10]; // 10 KB Buffer

            int read;
            while ((read = inputStream.read(buffer)) != -1) {
                md.update(buffer, 0, read);
            }

            StringBuilder hexString = new StringBuilder();
            for (byte digestByte : md.digest())
                hexString.append(String.format("%02x", digestByte));

            WritableMap map = Arguments.createMap();
            map.putString("hash", hexString.toString());
            promise.resolve(map);
        } catch (Exception ex) {
            ex.printStackTrace();
            reject(promise, filepath, ex);
        }
    }


    private void reject(Promise promise, String filepath, Exception ex) {
        if (ex instanceof FileNotFoundException) {
            rejectFileNotFound(promise, filepath);
            return;
        }

        promise.reject(null, ex.getMessage());
    }

    private void rejectFileNotFound(Promise promise, String filepath) {
        promise.reject("ENOENT", "ENOENT: no such file or directory, open '" + filepath + "'");
    }

    private void rejectFileIsDirectory(Promise promise) {
        promise.reject("EISDIR", "EISDIR: illegal operation on a directory, read");
    }
}
