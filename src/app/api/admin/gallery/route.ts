import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

async function checkAuth() {
    const session = await getServerSession(authOptions);
    if (!session) throw new Error('Unauthorized');
}

export async function GET() {
    const images = await prisma.galleryImage.findMany({ orderBy: { order: 'asc' } });
    return NextResponse.json(images);
}

export async function POST(req: Request) {
    try {
        await checkAuth();
        const data = await req.json();
        const count = await prisma.galleryImage.count();
        const img = await prisma.galleryImage.create({ data: { ...data, order: count + 1 } });
        return NextResponse.json(img, { status: 201 });
    } catch (e: any) {
        if (e.message === 'Unauthorized') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        return NextResponse.json({ error: 'Error' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        await checkAuth();
        const { id, ...rest } = await req.json();
        const img = await prisma.galleryImage.update({ where: { id }, data: rest });
        return NextResponse.json(img);
    } catch (e: any) {
        if (e.message === 'Unauthorized') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        return NextResponse.json({ error: 'Error' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        await checkAuth();
        const { id } = await req.json();
        await prisma.galleryImage.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (e: any) {
        if (e.message === 'Unauthorized') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        return NextResponse.json({ error: 'Error' }, { status: 500 });
    }
}
