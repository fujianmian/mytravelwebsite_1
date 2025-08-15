// lib/telemetry.js
import { NodeSDK } from '@opentelemetry/sdk-node';
const { Resource } = require('@opentelemetry/resources/build/src/Resource');
import { ATTR_SERVICE_NAME, ATTR_SERVICE_VERSION } from '@opentelemetry/semantic-conventions';
import { AWSXRayIdGenerator } from '@opentelemetry/id-generator-aws-xray';
import { AWSXRayPropagator } from '@opentelemetry/propagator-aws-xray';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { AwsInstrumentation } from '@opentelemetry/instrumentation-aws-sdk';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { propagation } from '@opentelemetry/api';

let sdk = null;

export function initializeTelemetry() {
    if (sdk) return sdk;

    const shouldUseXRay = process.env.NODE_ENV === 'production' && process.env.AWS_XRAY_TRACING_NAME;

    if (shouldUseXRay) {
        propagation.setGlobalPropagator(new AWSXRayPropagator());

        sdk = new NodeSDK({
            resource: new Resource({
                [ATTR_SERVICE_NAME]: 'mytravelwebsite',
                [ATTR_SERVICE_VERSION]: '1.0.0',
            }),
            spanProcessors: [
                new BatchSpanProcessor(
                    new OTLPTraceExporter({
                        url: 'grpc://localhost:4317',
                    })
                ),
            ],
            instrumentations: [
                new AwsInstrumentation({
                    suppressInternalInstrumentation: true,
                }),
                new HttpInstrumentation({
                    requestHook: (span, request) => {
                        if ('headers' in request) {
                            span.setAttributes({
                                'http.request.header.user-agent': request.headers?.['user-agent'] || '',
                            });
                        }
                    },
                    responseHook: (span, response) => {
                        span.setAttributes({
                            'http.response.status_code': response.statusCode,
                        });
                    },
                }),
            ],
            idGenerator: new AWSXRayIdGenerator(),
        });

        try {
            sdk.start();
            console.log('OpenTelemetry started with X-Ray integration');
        } catch (error) {
            console.error('Failed to start OpenTelemetry:', error);
        }
    }

    return sdk;
}