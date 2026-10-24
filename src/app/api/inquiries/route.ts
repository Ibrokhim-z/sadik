import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { parentName, phone, childAge, groupInterest, comment } = body;
        if (!parentName || !phone || !childAge || !groupInterest) {
            return NextResponse.json({ error: 'Заполните все обязательные поля' }, { status: 400 });
        }
        const inquiry = await prisma.inquiry.create({
            data: { parentName, phone, childAge, groupInterest, comment: comment || '' },
        });
        return NextResponse.json({ success: true, id: inquiry.id }, { status: 201 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Внутренняя ошибка сервера' }, { status: 500 });
    }
}

export async function GET() {
    // Only admin can view — handled in admin API route
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}
