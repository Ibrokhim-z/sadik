import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

async function checkAuth() {
    const session = await getServerSession(authOptions);
    if (!session) throw new Error('Unauthorized');
}

export async function GET() {
    const settings = await prisma.settings.findUnique({ where: { id: 1 } });
    return NextResponse.json(settings);
}

export async function PUT(req: Request) {
    try {
        await checkAuth();
        const data = await req.json();
        const settings = await prisma.settings.upsert({
            where: { id: 1 },
            update: data,
            create: { id: 1, ...data },
        });
        return NextResponse.json(settings);
    } catch (e: any) {
        if (e.message === 'Unauthorized') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        return NextResponse.json({ error: 'Error' }, { status: 500 });
    }
}
