import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

async function checkAuth() {
    const session = await getServerSession(authOptions);
    if (!session) throw new Error('Unauthorized');
}

export async function GET() {
    try {
        await checkAuth();
        const inquiries = await prisma.inquiry.findMany({ orderBy: { createdAt: 'desc' } });
        return NextResponse.json(inquiries);
    } catch { return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); }
}

export async function PATCH(req: Request) {
    try {
        await checkAuth();
        const { id, read } = await req.json();
        const updated = await prisma.inquiry.update({ where: { id }, data: { read } });
        return NextResponse.json(updated);
    } catch { return NextResponse.json({ error: 'Error' }, { status: 500 }); }
}

export async function DELETE(req: Request) {
    try {
        await checkAuth();
        const { id } = await req.json();
        await prisma.inquiry.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch { return NextResponse.json({ error: 'Error' }, { status: 500 }); }
}
