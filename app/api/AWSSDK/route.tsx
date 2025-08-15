import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const { initXRay } = await import('@/lib/tracing/initXRay');
    const { getXRayClient } = await import('@/lib/tracing/xrayClient');

    const tracer = initXRay();
    const xray = getXRayClient();

    return tracer.startActiveSpan('get-service-graph', async (span: any) => {
        try {
            const now = new Date();
            const params = {
                StartTime: new Date(now.getTime() - 5 * 60000),
                EndTime: now
            };

            const result = await xray.getServiceGraph(params).promise();

            span.setStatus({ code: 1 }); // OK
            return NextResponse.json({
                success: true,
                services: result.Services
            });

        } catch (err: any) {
            span.setStatus({ code: 2, message: err.message });
            return NextResponse.json({ success: false, error: err.message }, { status: 500 });
        } finally {
            span.end();
        }
    });
}

export async function POST(req: NextRequest) {
    const { initXRay } = await import('@/lib/tracing/initXRay');
    const tracer = initXRay();

    return tracer.startActiveSpan('health-check', async (span: any) => {
        span.setStatus({ code: 1 });
        return NextResponse.json({ service: 'mytravelwebsite', status: 'healthy' });
    });
}
