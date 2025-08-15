// lib/tracing/xrayClient.js
let xrayInstance = null;

export function getXRayClient() {
    if (!xrayInstance) {
        const AWS = require('aws-sdk');
        xrayInstance = new AWS.XRay();
    }
    return xrayInstance;
}
