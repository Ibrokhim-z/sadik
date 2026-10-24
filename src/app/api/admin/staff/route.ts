import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

async function checkAuth() {
    const session = await getServerSession(authOptions);
    if (!session) throw new Error('Unauthorized');
}

export async function GET() {
    const staff = await prisma.staff.findMany({ orderBy: { order: 'asc' } });
    return NextResponse.json(staff);
}

export async function POST(req: Request) {
    try {
        await checkAuth();
        const data = await req.json();
        const count = await prisma.staff.count();
        const member = await prisma.staff.create({ data: { ...data, order: count + 1 } });
        return NextResponse.json(member, { status: 201 });
    } catch (e: any) {
        if (e.message === 'Unauthorized') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        return NextResponse.json({ error: 'Error' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        await checkAuth();
        const { id, ...rest } = await req.json();
        const member = await prisma.staff.update({ where: { id }, data: rest });
        return NextResponse.json(member);
    } catch (e: any) {
        if (e.message === 'Unauthorized') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        return NextResponse.json({ error: 'Error' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        await checkAuth();
        const { id } = await req.json();
        await prisma.staff.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (e: any) {
        if (e.message === 'Unauthorized') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        return NextResponse.json({ error: 'Error' }, { status: 500 });
    }
}
