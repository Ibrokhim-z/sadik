import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

async function checkAuth() {
    const session = await getServerSession(authOptions);
    if (!session) throw new Error('Unauthorized');
}

export async function GET() {
    const news = await prisma.news.findMany({ orderBy: { publishedAt: 'desc' } });
    return NextResponse.json(news);
}

export async function POST(req: Request) {
    try {
        await checkAuth();
        const data = await req.json();
        const slug = data.title.toLowerCase().replace(/[^a-z0-9а-я\s]/gi, '').replace(/\s+/g, '-').substring(0, 60) + '-' + Date.now();
        const news = await prisma.news.create({ data: { ...data, slug } });
        return NextResponse.json(news, { status: 201 });
    } catch (e: any) {
        if (e.message === 'Unauthorized') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        return NextResponse.json({ error: 'Error' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        await checkAuth();
        const data = await req.json();
        const { id, ...rest } = data;
        const news = await prisma.news.update({ where: { id }, data: rest });
        return NextResponse.json(news);
    } catch (e: any) {
        if (e.message === 'Unauthorized') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        return NextResponse.json({ error: 'Error' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        await checkAuth();
        const { id } = await req.json();
        await prisma.news.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (e: any) {
        if (e.message === 'Unauthorized') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        return NextResponse.json({ error: 'Error' }, { status: 500 });
    }
}
