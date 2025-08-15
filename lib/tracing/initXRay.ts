// lib/tracing/initXRay.js

let sdk = null;
let tracer = null;

export function initXRay() {
    if (typeof window !== 'undefined') return; // 防止在浏览器执行
    if (sdk) return tracer; // 避免重复初始化

    const AWS = require('aws-sdk');
    const AWSXRay = require('aws-xray-sdk');
    const { NodeSDK } = require('@opentelemetry/sdk-node');
    const { Resource } = require('@opentelemetry/resources');
    const { ATTR_SERVICE_NAME, ATTR_SERVICE_VERSION } = require('@opentelemetry/semantic-conventions');
    const { AWSXRayIdGenerator } = require('@opentelemetry/id-generator-aws-xray');
    const { AWSXRayPropagator } = require('@opentelemetry/propagator-aws-xray');
    const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');
    const { AwsInstrumentation } = require('@opentelemetry/instrumentation-aws-sdk');
    const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-grpc');
    const { BatchSpanProcessor } = require('@opentelemetry/sdk-trace-base');
    const { trace, propagation } = require('@opentelemetry/api');

    AWS.config.update({
        region: process.env.AWS_REGION || 'us-east-1',
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    });

    const shouldUseXRay = process.env.NODE_ENV === 'production' && process.env.AWS_XRAY_TRACING_NAME;

    if (shouldUseXRay) {
        propagation.setGlobalPropagator(new AWSXRayPropagator());

        sdk = new NodeSDK({
            resource: new Resource({
                [ATTR_SERVICE_NAME]: 'mytravelwebsite',
                [ATTR_SERVICE_VERSION]: '1.0.0',
            }),
            spanProcessors: [
                new BatchSpanProcessor(new OTLPTraceExporter({
                    url: 'grpc://localhost:4317'
                }))
            ],
            instrumentations: [
                new AwsInstrumentation({
                    suppressInternalInstrumentation: true,
                }),
                new HttpInstrumentation()
            ],
            idGenerator: new AWSXRayIdGenerator(),
        });

        sdk.start();
        AWSXRay.captureAWS(AWS);

        tracer = trace.getTracer('xray-service', '1.0.0');
        console.log('✅ OpenTelemetry X-Ray 初始化完成');
    }

    return tracer;
}
