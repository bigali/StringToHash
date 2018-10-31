//
//  StringToHash.m
//  StringToHash
//
//  Created by Administrateur on 31/10/2018.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(StringToHash, NSObject)

_RCT_EXTERN_REMAP_METHOD(getHash, getHashAsync: (NSString *) method
                         text:(NSString*)text
                         resolve:(RCTPromiseResolveBlock)resolve
                         reject:(RCTPromiseRejectBlock)reject, NO)

@end
