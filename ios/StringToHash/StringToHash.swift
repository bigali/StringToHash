//
//  StringToHash.swift
//  StringToHash
//
//  Created by Administrateur on 31/10/2018.
//  Copyright © 2018 Facebook. All rights reserved.
//

@objc(StringToHash)
class StringToHash: NSObject {
  
  
  func md5(_ string: String) -> String {
    
    let context = UnsafeMutablePointer<CC_MD5_CTX>.allocate(capacity: 1)
    var digest = Array<UInt8>(repeating:0, count:Int(CC_MD5_DIGEST_LENGTH))
    CC_MD5_Init(context)
    CC_MD5_Update(context, string, CC_LONG(string.lengthOfBytes(using: String.Encoding.utf8)))
    CC_MD5_Final(&digest, context)
    context.deallocate(capacity: 1)
    var hexString = ""
    for byte in digest {
      hexString += String(format:"%02x", byte)
    }
    
    return hexString
  }
  
  
  func sha1(_ string: String) -> String {
    
    let context = UnsafeMutablePointer<CC_SHA1_CTX>.allocate(capacity: 1)
    var digest = Array<UInt8>(repeating:0, count:Int(CC_SHA1_DIGEST_LENGTH))
    CC_SHA1_Init(context)
    CC_SHA1_Update(context, string, CC_LONG(string.lengthOfBytes(using: String.Encoding.utf8)))
    CC_SHA1_Final(&digest, context)
    context.deallocate(capacity: 1)
    var hexString = ""
    for byte in digest {
      hexString += String(format:"%02x", byte)
    }
    
    return hexString
  }
  
  @objc func getHashAsync(_ method: String,
                          text: String,
                          resolve: RCTPromiseResolveBlock,
                          reject: RCTPromiseRejectBlock) {
    var hash = ""
    if(text != "") {
      
      if(method == "MD5") {
        hash = md5(text)
      } else if (method == "SHA-1") {
        hash = sha1(text)
      } else {
        reject("err","unknown method","unknown method" as! Error)
      }
      
     
  
      
      
      resolve(["hash": hash])
    } else {
      reject("hash error","hash error","hash error" as! Error)
    }
  }
}
