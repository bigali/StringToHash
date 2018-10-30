package com.stringtohash;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;

import java.security.MessageDigest;

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
}
